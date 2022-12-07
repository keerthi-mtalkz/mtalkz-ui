const flowchartSettingsProvider = (definition) => {
  const settingsDiv = document.createElement('form');
  const nameDiv = document.createElement('div');
  nameDiv.innerHTML = `<h2>Campaign Settings</h2><label class="req">Campaign Name</label><input id="flowchart-name" placeholder="Campaign Name" value="${definition.properties.name||''}" required/><label class="req">Number of Retries</label><input type="number" id="retries-count" placeholder="Retries" min="0" max="5" step="1" value="${definition.properties.retries||0}" required/><label class="req">Retry After (Minutes)</label><input type="number" id="retries-delay" placeholder="Minutes" min="0" step="1" value="${definition.properties.delay||0}" required/><div id="retries-statuses"><label class="req">Retry for Dial Status</label><input type="checkbox" value="Busy"/> Busy<br/><input type="checkbox" value="Congestion"/> Congestion<br/><input type="checkbox" value="Unreachable"/> Not Answered<br/></div>`;
  const flowChartName = nameDiv.querySelector('#flowchart-name');
  const retriesCount = nameDiv.querySelector('#retries-count');
  const retriesDelay = nameDiv.querySelector('#retries-delay');
  const retriesStatuses = nameDiv.querySelectorAll('#retries-statuses input[type="checkbox"]');
  retriesStatuses.forEach(e => {
    e.checked = definition.properties.statuses?.indexOf(e.value) >= 0;
  });

  const saveBtn = document.createElement('button');
  saveBtn.innerText = 'Save';
  saveBtn.className = 'save-btn';
  saveBtn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopImmediatePropagation();
    if (!settingsDiv.checkValidity()) {
      return settingsDiv.reportValidity();
    }
    flowchartModified = true;
    definition.properties = {
      name: flowChartName.value,
      retries: retriesCount.value,
      delay: retriesDelay.value,
      statuses: Array.from(retriesStatuses).filter(e => e.checked).map(e => e.value)
    };
  });
  settingsDiv.appendChild(saveBtn);
  settingsDiv.appendChild(nameDiv);
  return settingsDiv;
}