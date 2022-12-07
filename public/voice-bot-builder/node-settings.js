/**
 * Component settings functions
 */
/**
 * Agent node settings
 * @param {Step} step 
 * @param {HTMLElement} saveBtn 
 * @param {HTMLElement} root 
 * @returns HTMLElement
 */
 const getAgentSettings = (step, saveBtn, root) => {
  const p = document.createElement('p');
  p.innerHTML = '<label class="req">Agent Number</label><input type="text" pattern="\\d{10}" title="Please enter 10-digit phone number" placeholder="10-digit phone number" required/>';
  const pinput = p.querySelector('input');
  pinput.value = step.properties.agentNumber;
  saveBtn.addEventListener('click', (e) => {
    if (!validateStepInput(step, root, e)) return false;
    step.properties.agentNumber = +(pinput?.value?.trim() || 0);
    flowChartDesigner.notifiyDefinitionChanged();
  });
  return p;
}

/**
 * Switch node settings
 * @param {Step} step 
 * @param {HTMLElement} saveBtn 
 * @param {HTMLElement} root 
 * @returns HTMLElement
 */
 const getSwitchSettings = (step, saveBtn, root) => {
  const p = document.createElement('p');
  p.innerHTML = `<h3>Invalid</h3><label class="req">Number of Retries</label><input type="number" id="invalid-retries" placeholder="Retries" min="0" max="5" step="1" value=${step.properties.retries || 0} required/><label class="req">Select Recording</label><select id="invalid-recording" required>${getOptionsList(recordings)}</select><h3>Branches <button id="add-branch">+</button></h3>`;
  const invalidRetries = p.querySelector('#invalid-retries');
  const invalidRecording = p.querySelector('#invalid-recording');
  invalidRecording.value = step.properties.recordingURL;
  const addBtn = p.querySelector('button#add-branch');

  const appendBranch = (condition = null) => {
    const pb = document.createElement('p');
    pb.className = 'conditional-branch';
    pb.innerHTML = `<label class="req">Branch Label</label><input type="text" class="branch-label" value="${condition ? condition.label : ''}" placeholder="Branch Label" required/><label class="req">IVR Input</label><input type="text" pattern="\\d" title="Please enter a single digit" class="branch-expression" value="${condition ? condition.expression : ''}" placeholder="Single Digit" required/> <span class="branch-delete-btn">&times;</span>`;
    const delBtn = pb.querySelector('.branch-delete-btn');
    delBtn.addEventListener('click', () => {
      pb.remove();
    });
    p.appendChild(pb);
  }

  addBtn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopImmediatePropagation();
    appendBranch();
  });
  step.properties.conditions.forEach(condition => appendBranch(condition));

  saveBtn.addEventListener('click', (e) => {
    if (!validateStepInput(step, root, e)) return false;
    step.properties = {
      retries: invalidRetries.value,
      recordingURL: invalidRecording.value,
      conditions: []
    };
    const allowedBranches = ['Invalid'];
    p.querySelectorAll('p.conditional-branch').forEach(pb => {
      const label = pb.querySelector('.branch-label').value?.trim();
      const expression = pb.querySelector('.branch-expression').value?.trim();
      if (!step.branches[label]) {
        step.branches[label] = [];
      }
      step.properties.conditions.push({label, expression});
      allowedBranches.push(label);
    });
    for (label in step.branches) {
      if (!allowedBranches.includes(label)) {
        delete step.branches[label];
      }
    }
    flowChartDesigner.notifiyDefinitionChanged();
  });
  return p;
};

/**
 * Message node settings
 * @param {Step} step 
 * @param {HTMLElement} saveBtn 
 * @param {HTMLElement} root 
 * @returns HTMLElement
 */
 const getMessageSettings = (step, saveBtn, root) => {
  const p = document.createElement('p');
  p.innerHTML = `<label class="req">Message Type</label><select required id="message-type"><option value="Recording">Recording</option><option value="Single_TTS">Single TTS</option><option value="Multiple_TTS">Multiple TTS</option></select><div class="message-type-options Recording"><label class="req">Select Recording</label><select id="recording">${getOptionsList(recordings)}</select><p class="audio-player">Play Selected Recording <audio id="recording-player" controls src=""></audio></p></div><div class="message-type-options Single_TTS"><label class="req">Message Text</label><textarea id="message-text" cols="30" rows="3" placeholder="Message Text">${step.properties.ttsText || ""}</textarea><p class="audio-player">Hear Text-to-Speech (after Save) <audio id="tts-player" controls src=""></audio></p></div><div class="message-type-options Multiple_TTS"><label class="req">Add Message Blocks (Max: 5) <button id="add-message-block-btn">+</button></label><table id="message-blocks"></table></div>`;
  const addNewMessageBlock = (value = null) => {
    if (p.querySelectorAll('#message-blocks .message-block').length >= 5) {
      console.error('At most 5 message blocks can be added');
      return;
    }
    const tr = document.createElement('tr');
    tr.innerHTML += `<td><textarea class="message-block" cols="30" rows="3" placeholder="Message Text">${value || ""}</textarea></td><td><span class="option-delete-btn">&times;</span></td>`;
    const delBtn = tr.querySelector('.option-delete-btn');
    delBtn.addEventListener('click', () => {
      tr.remove();
    });
    p.querySelector('#message-blocks').appendChild(tr);
  }
  const addMessageBlockBtn = p.querySelector('#add-message-block-btn');
  addMessageBlockBtn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopImmediatePropagation();
    addNewMessageBlock();
  });
  const messageType = p.querySelector('#message-type');
  messageType.addEventListener('change', () => {
    const opt = messageType.value;
    p.querySelectorAll('.message-type-options').forEach(div => {
      div.style.display = 'none';
    });
    p.querySelectorAll('.message-type-options.'+opt).forEach(div => {
      div.style.display = 'block';
    });
  });
  const recordingSelector = p.querySelector('#recording');
  recordingSelector.addEventListener('change', (e) => {
    const player = p.querySelector('#recording-player');
    player.src = recordingSelector.value;
  });
  messageType.value = step.properties.messageType || 'Recording';
  switch(messageType.value) {
    case 'Recording':
      recordingSelector.value = step.properties.recordingURL;
      break;
    case 'Single_TTS':
      const player = p.querySelector('#tts-player');
      player.src = step.properties.ttsURL;
      break;
    case 'Multiple_TTS':
      step.properties.tts.forEach(tts => {
        addNewMessageBlock(tts);
      });
      break;
    default:
      throw new Error('Unknown message type: ' + messageType.value);
  }
  if (p.querySelectorAll('#message-blocks .message-block').length == 0) {
    addNewMessageBlock();
  }
  messageType.dispatchEvent(new Event('change'));

  saveBtn.addEventListener('click', (e) => {
    if (!validateStepInput(step, root, e)) return false;
    step.properties = { messageType: messageType.value };
    switch(messageType.value) {
      case 'Recording':
        step.properties.recordingURL = recordingSelector.value;
        step.properties.recordingName = recordingSelector.options[recordingSelector.selectedIndex].text;
        break;
      case 'Single_TTS':
        const ttsText = p.querySelector('#message-text').value;
        step.properties.ttsText = ttsText;
        try {
          fetchURL('https://mtalkz.cloud/services/tts', {
            headers: { 'Authorization': null },
            method: 'POST',
            body: JSON.stringify({input: {text: ttsText}})
          }).then(res => {
            console.log('TTS', res);
            if (res.url) {
              p.querySelector('#tts-player').src = res.url;
              step.properties.ttsURL = res.url;
            } else {
              throw new Error(res.error || 'Unknown Error');
            }
          })
        } catch(err) {
          showError('Failed to convert text to speech - ' + (err.message || 'Unknown Error'));
        }
        break;
      case 'Multiple_TTS':
        step.properties.tts = [];
        p.querySelectorAll('#message-blocks .message-block').forEach(ta => {
          step.properties.tts.push(ta.value?.trim());
        });
        break;
    }
    flowChartDesigner.notifiyDefinitionChanged();
  });
  return p;
};

/**
 * API node settings
 * @param {Step} step 
 * @param {HTMLElement} saveBtn 
 * @param {HTMLElement} root 
 * @returns HTMLElement
 */
 const getApiSettings = (step, saveBtn, root) => {
  const p = document.createElement('p');
  p.innerHTML = `<label for="http-url" class="req">API Method & URL</label><select id="http-method" required><option value="get">GET</option><option value="post">POST</option><option value="put">PUT</option><option value="delete">DELETE</option></select><input type="url" id="http-url" value="${step.properties.url}" placeholder="API URL" required/><p><label>Headers <button class="add-params-btn" type="headers">+</button></label><table style="width:100%"><tbody id="headers-params-tbl-body"></tbody></table></p><p><label>Request Body Parameters <button class="add-params-btn" type="body">+</button></label><table style="width:100%"><tbody id="body-params-tbl-body"></tbody></table><input type="checkbox" id="url-encoded" "${step.properties.body?.urlEncoded?'checked':''}"/> URL Encode?</p>`;
  const addNewParameter = (type, param = null) => {
    const tr = document.createElement('tr');
    tr.innerHTML += `<tr><th><input type="text" class="param-key" value="${param?.key || ''}" placeholder="Key" required/></th><td><input type="text" class="param-value" value="${param?.value || ''}" placeholder="Value" required/></td><td><span class="param-delete-btn">&times;</td>`;
    const delBtn = tr.querySelector('.param-delete-btn');
    delBtn.addEventListener('click', () => {
      tr.remove();
    });
    p.querySelector('#' + type + '-params-tbl-body').appendChild(tr);
  }
  p.querySelectorAll('.add-params-btn').forEach(btn => {
    const type = btn.getAttribute('type');
    btn.addEventListener('click', () => {
      addNewParameter(type);
    });
  });
  const httpMethod = p.querySelector('#http-method');
  httpMethod.value = step.properties.method;
  const urlEncoded = p.querySelector('#url-encoded');
  urlEncoded.checked = step.properties.body.urlEncoded;
  step.properties.headers.forEach(param => {addNewParameter('headers', param)});
  step.properties.body?.params.forEach(param => {addNewParameter('body', param)});
  saveBtn.addEventListener('click', (e) => {
    if (!validateStepInput(step, root, e)) return false;
    step.properties = {
      method: httpMethod.value,
      url: p.querySelector('#http-url').value.trim(),
      headers: [],
      outputMapping: [],
      body: {
        urlEncoded: urlEncoded.checked,
        params: []
      }
    }
    p.querySelectorAll('#headers-params-tbl-body tr').forEach(tr => {
      const key = tr.querySelector('input.param-key').value.trim();
      const value = tr.querySelector('input.param-value').value.trim();
      step.properties.headers.push({key, value});
    });
    const bodyParams = p.querySelectorAll('#body-params-tbl-body tr');
    if (bodyParams.length) {
      bodyParams.forEach(tr => {
        const key = tr.querySelector('input.param-key').value.trim();
        const value = tr.querySelector('input.param-value').value.trim();
        step.properties.body.params.push({key, value});
      });
    }
    flowChartDesigner.notifiyDefinitionChanged();
  });
  return p;
};

/**
 * Connector node settings
 * @param {Step} step 
 * @param {HTMLElement} saveBtn 
 * @param {HTMLElement} root 
 * @returns HTMLElement
 */
 const getConnectorSettings = (step, saveBtn, root) => {
  const p = document.createElement('p');
  p.innerHTML = '<label class="req">Target Campaign Name</label><input type="text" id="flowchart-name" placeholder="Name of a listed campaign" required/>';
  const campaignName = p.querySelector('#flowchart-name');
  campaignName.value = step.properties.campaignName;
  saveBtn.addEventListener('click', (e) => {
    if (!validateStepInput(step, root, e)) return false;
    step.properties.campaignName = campaignName.value;
    flowChartDesigner.notifiyDefinitionChanged();
  });
  return p;
};

/**
 * Checks if the current name already exists in a given sequence
 * @param {Step[]} sequence 
 * @param {String} name 
 * @param {Step} step 
 * @returns Boolean
 */
const hasDuplicateNameInSequence = (sequence, name, step) => {
  for (let i=0; i<sequence.length; ++i) {
    const node = sequence[i];
    if (node.name === name && node.id !== step.id) return true;
    else if (node.type === 'logic') {
      for (branch in node.branches) {
        const subSeq = node.branches[branch];
        if (hasDuplicateNameInSequence(subSeq, name, step)) return true;
      }
    }
  }
  return false;
}

/**
 * Checks if the given name is duplicate in the flowchart
 * @param {String} name 
 * @param {Step} step 
 * @returns Boolean
 */
const hasDuplicateName = (name, step) => {
  const sequence = flowChartDesigner.getDefinition()['sequence'];
  return hasDuplicateNameInSequence(sequence, name, step);
}

/**
 * Validate common inputs for the step
 * @param {Step} step
 * @param {HTMLElement} root
 * @param {event} e
 * @returns Boolean
 */
const validateStepInput = (step, root, e) => {
  e.preventDefault();
  e.stopImmediatePropagation();
  flowchartModified = true;
  const nameInput = root.querySelector('input.stepNameInput');
  const name = nameInput.value;
  nameInput.setCustomValidity('');
  if (!root.checkValidity()) {
    root.reportValidity();
    return false;
  }
  if (hasDuplicateName(name, step)) {
    nameInput.setCustomValidity(`Name "${name}" has already been assigned to another node`);
    root.reportValidity();
    return false;
  }
  step.name = name;
  step.modified = true;
  return true;
}

/**
 * Returns a settings form for the given step
 * @param {Step} step 
 * @returns HTMLElement
 */
const nodeSettingsProvider = (step) => {
  const root = document.createElement('form');
  const saveBtn = document.createElement('button');
  saveBtn.innerText = 'Save';
  saveBtn.className = 'save-btn';
  root.appendChild(saveBtn);

  const title = document.createElement('h2');
  title.innerText = step.type + ' Node Settings';
  root.appendChild(title);

  const nameItem = document.createElement('p');
  nameItem.innerHTML = `<label class="req">Name</label> <input type="text" class="stepNameInput" required value="${step.name}"/>`;
  root.appendChild(nameItem);

  let settings = null;
  switch(step.type) {
    case 'Agent':
      settings = getAgentSettings(step, saveBtn, root);
      break;
    case 'IVR':
      settings = getSwitchSettings(step, saveBtn, root);
      break;
    case 'Message':
      settings = getMessageSettings(step, saveBtn, root);
      break;
    case 'API':
      settings = getApiSettings(step, saveBtn, root);
      break;
    case 'Connector':
      settings = getConnectorSettings(step, saveBtn, root);
      break;
  }

  if (settings) {
    root.appendChild(settings);
  }

  return root;
}

/**
 * Validate flowchart
 */
/**
 * Validates the properties for a message type node
 * @param {Step} node 
 * @returns {String[]}
 */
const validateMessageNode = (node) => {
  const errors = [];

  switch (node.properties.messageType) {
    case 'Recording':
      if (!(node.properties.recordingURL?.trim())) {
        errors.push(`Recording must be selected for ${node.name}`);
      }
      break;
    case 'Single_TTS':
      if (!(node.properties.ttsText?.trim())) {
        errors.push(`Message Text is required in ${node.name}`);
      }
      break;
    case 'Multipl_TTS':
      if (!(node.properties.tts?.length)) {
        errors.push(`At least one message block is required in ${node.name}`);
      } else {
        node.properties.tts.forEach((tts, idx) => {
          if (!tts.length) {
            errors.push(`Message block #${idx+1} is empty in ${node.name}`);
          }
        });
      }
      break;
    case 'default':
      errors.push(`Unrecognized message type ${node.properties.messageType} in ${node.name}`);
  }

  return errors;
}

/**
 * Validates the properties for a switch type node
 * @param {Step} node 
 * @returns {String[]}
 */
const validateSwitchNode = (node) => {
  const errors = [];

  //TODO check properties and branches sync

  for (let label in node.branches) {
    const sequence = node.branches[label];
    const seqErrors = validateSequence(sequence);
    if (seqErrors.length) {
      errors.push(...seqErrors);
    }
  }
  return errors;
}

/**
 * Validates the properties for a node
 * @param {Step} node 
 * @returns {String[]}
 */
const validateNode = (node) => {
  const errors = [];
  if (!node.name?.trim().length) {
    errors.push('Every node must have a name');
  } else if (hasDuplicateName(node.name, node)) {
    errors.push(`Node name ${node.name} is duplicate`);
  }

  if (!node.modified) {
    errors.push(`Node with name ${node.name} has not been saved`);
  }

  let nodeErrors = [];
  switch(node.type) {
    case 'Agent':
    case 'Connector':
    case 'API':
      // No special validation required except HTML form validations
      break;
    case 'Message':
      nodeErrors = validateMessageNode(node); break;
    case 'IVR':
      nodeErrors = validateSwitchNode(node); break;
    default:
      errors.push('Unknown node type' + node.type);
  }
  if (nodeErrors.length) {
    errors.push(...nodeErrors);
  }

  return errors;
}

/**
 * Validates the properties for a sequence of nodes
 * @param {Step[]} sequence 
 * @returns {String[]}
 */
const validateSequence = (sequence) => {
  const errors = [];
  sequence.forEach(node => {
    const nodeErrors = validateNode(node);
    if (nodeErrors.length) {
      errors.push(...nodeErrors);
    }
  })
  return errors;
}

/**
 * Validates the properties for a flowchart
 * @param {Flowchart} flowchart 
 * @returns {String[]}
 */
const validateFlowchart = (flowchart) => {
  const errors = [];
  const { properties, sequence } = flowchart;
  if (!properties.name?.trim().length) {
    errors.push('Campaign name is required');
  }
  if (!sequence.length) {
    errors.push('Campaign must have at least one action node');
  } else {
    const seqErrors = validateSequence(sequence);
    if (seqErrors.length) {
      errors.push(...seqErrors);
    }
  }
  return errors;
}
