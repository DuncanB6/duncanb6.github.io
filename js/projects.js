/*
Javascript for the projects page. Similar to experiences.js.

Duncan Boyd
duncan@wapta.ca
May 2, 2025
*/

const projectListDiv = document.getElementById("project-list");

// static list of project IDs
const projectIds = ['clockout', 'foghorn', '3dprinting', 'billboard', 'capstone', 'dashlight', 'elec291', 'elec391', 'elec442'];

async function loadProjectData(id) {
  const res = await fetch(`projects/${id}.json`);
  return res.json();
}

async function renderProjects() {
  const projects = [];

  for (const id of projectIds) {
    try {
      const project = await loadProjectData(id);
      projects.push(project);
    } catch (error) {
      console.error(`Error loading project ${id}:`, error);
    }
  }

  // sort projects by date descending (most recent first)
  projects.sort((a, b) => new Date(b.date) - new Date(a.date));

  for (const project of projects) {
    const item = document.createElement("div");
    item.innerHTML = `
      <div class="item-container">
          <div class="item-box">
              <div class="item-image">
                  <a href="project.html?id=${project.id}">
                      <img class="item-img" src="${project.images[0]}" alt="${project.title}" width="200"/>
                  </a>
              </div>

              <div class="item-content">
                  <a id="item-link" href="project.html?id=${project.id}">
                      <h1 id="project-title">${project.title}</h1>
                  </a>

                  <p>${project.description}</p>
              </div>
          </div>
      </div>
    `;
    projectListDiv.appendChild(item);
  }
}


renderProjects();
