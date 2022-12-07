const nextId = sequentialWorkflowDesigner.nextId;
const designer = document.getElementById('designer');
const urlParams = new URLSearchParams(window.location.search);
const campaignId = urlParams.get('id') || '';
const token = urlParams.get('token') || false;
let readOnly = urlParams.get('view') || false;
const errorsList = document.getElementById('errors');
const baseUrl = 'https://app.mtalkz.cloud/api/voice-campaigns' + (campaignId ? ('/' + campaignId) : '');
const recordingsUrl = 'https://app.mtalkz.cloud/api/voice-recordings';
let flowchartModified = false;
let flowchart_name = null;
let recordings = {};

/** Utility functions */
const showError = (html, duration=6000) => {
  errorsList.innerHTML = html;
  errorsList.style.display = 'block';
  setTimeout(() => {
    errorsList.style.display = 'none';
  }, duration);
}

const fetchURL = (url, config={}) => {
  config.headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    ...(config.headers || {})
  };
  return fetch(url, config).then(res => {
    return res.json();
  });
}

const getOptionsList = (obj) => {
  let html = '<option value="">(Select from the list)</option>';
  for (key in obj) {
    html += `<option value="${key}">${obj[key]}</option>`;
  }
  return html;
}

if (!token) {
  const error = "Authentication token is required";
  showError(error);
  throw new Error(error);
}

/**
 * Initial Flowchart configuration
 */
const configuration = {
  toolbox: {
    isHidden: false,
    groups: [
      {
        name: 'Action',
        steps: [
          {
            componentType: 'task',
            type: 'Message',
            name: 'Message',
            modified: false,
            properties: {
              messageType: 'Recording',
              recordingURL: null,
              recordingName: null
            }
          },
          {
            componentType: 'task',
            type: 'Agent',
            name: 'Call Agent',
            modified: false,
            properties: {
              agentNumber: '',
            }
          },
          {
            componentType: 'task',
            type: 'API',
            name: 'API Call',
            modified: false,
            properties: {
              method: 'post',
              url: '',
              headers: [],
              body: {
                urlEncoded: true,
                params: []
              },
            }
          },
        ] //TODO
      },
      {
        name: 'Control',
        steps: [
          {
            componentType: 'task',
            type: 'Connector',
            name: 'Connect',
            modified: false,
            properties: {
              campaignName: '',
            }
          },
          {
            componentType: 'switch',
            type: 'IVR',
            name: 'IVR',
            modified: false,
            nextNodeName: 'stop',
            properties: {
              retries: 0,
              recordingURL: null,
              conditions: []
            },
            branches: {
              Invalid: []
            }
          }
        ]
      }
    ],
  },
  steps: {
    iconUrlProvider: (_, type) => `./assets/icon-${type.toLowerCase()}.svg`,
    validator: () => true
  },
  editors: {
    globalEditorProvider: flowchartSettingsProvider,
    stepEditorProvider: nodeSettingsProvider,
  }
};

/**
 * Initial component definitions
 */
let definition = {
  properties: {
    name: null,
    retries: 0,
    delay: 0,
    stauses: []
  },
  sequence: []
};

/**
 * Initiate the flow chart designer
 */
let flowChartDesigner;
if (campaignId) {
  try {
    fetchURL(baseUrl).then(data => {
      console.log('Campaign', data);
      const { name, retries, delay, statuses, listed, json } = data.campaign;
      flowchart_name = name;
      definition = {
        properties: { name, retries, delay, statuses: statuses || [] },
        sequence: json
      };
      if (listed) {
        readOnly = true;
        configuration.isReadOnly = true;
      }
      flowChartDesigner = sequentialWorkflowDesigner.create(designer, definition, configuration);
    })
  } catch(err) {
    showError('Failed to fetch the campaign - ' + (err.message || 'Unknown Error'));
    throw err;
  }
} else {
  flowChartDesigner = sequentialWorkflowDesigner.create(designer, definition, configuration);
}
try {
  fetchURL(recordingsUrl).then(data => {
    console.log('Recordings', data);
    recordings = {};
    data.forEach(rec => {
      recordings[rec.url] = rec.name;
    });
  })
} catch(err) {
  showError('Failed to fetch recordings - ' + (err.message || 'Unknown Error'));
}

/**
 * Save flowchart via ajax
 */
const saveFlowChart = () => {
  if (readOnly) {
    return showError("Cannot save the flowchart in read only mode");
  }
  const flowchart = flowChartDesigner.getDefinition();
  const errors = validateFlowchart(flowchart);
  // console.log('Saving Flowchart', flowchart);
  if (errors.length) {
    let html = '';
    const uniqueErrors = [... new Set(errors)];
    uniqueErrors.forEach(error => {
      html += '<li>' + error + '</li>';
    });
    showError(html);
  } else {
    try {
      const data = { ...(flowchart.properties), json: flowchart.sequence };
      fetchURL(baseUrl, {
        method: campaignId ? 'PUT' : 'POST',
        body: JSON.stringify(data)
      }).then(data => {
        const successDiv = document.querySelector('#success');
        successDiv.innerText = `Campaign ${data.campaign.name} saved successfully`;
        successDiv.style.display = 'block';
        setTimeout(() => {successDiv.style.display = 'none';}, 6000);
        flowchartModified = false;
        fetch("https://mtalkz.cloud/postslack", {
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          method: "POST",
          body: JSON.stringify({"blocks":[{"type":"section","text":{"type":"mrkdwn","text":"Hey Team :wave:"}},{"type":"section","text":{"type":"mrkdwn","text":"*NEW VOICE FLOW REQUEST* :bell:\n\nDetails :point_right:"}},{"type":"section","text":{"type":"mrkdwn","text":`• Organisation: *${data.campaign.organization_id}* \n • Campaign Name:  *${data.campaign.name}*`}}]})
        });
        window.parent.location.href = '/voice-campaign';
      });
    } catch(err) {
      showError('Failed to save campaign to server - ' + (err.message || 'Unknown Error'));
    }
  }
}

document.getElementById('save').addEventListener('click', saveFlowChart);
document.getElementById('cancel').addEventListener('click', () => {window.history.back()});
window.addEventListener('beforeunload', (e) => {
  if (flowchartModified) {
    e.preventDefault();
    e.returnValue = 'The changes to flowchart have not been saved. Are you sure you want to exit?';
  } else {
    e.returnValue = null;
  }
});