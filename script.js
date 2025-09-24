    const skills = [];
    const projects = [];
    const phrases = [];

  
    document.getElementById("addPhraseBtn").addEventListener("click", () => {
      const phraseInput = document.getElementById("phraseInput");
      const phrase = phraseInput.value.trim();
      if(phrase){
        phrases.push(phrase);
        const div = document.createElement("div");
        div.className = "list-item";
        div.textContent = phrase;
        document.getElementById("phrasesList").appendChild(div);
        phraseInput.value = "";
      }
    });

    
    document.getElementById("addSkillBtn").addEventListener("click", () => {
      const skillInput = document.getElementById("skillInput");
      const skill = skillInput.value.trim();
      if(skill){
        skills.push(skill);
        const div = document.createElement("div");
        div.className = "list-item";
        div.textContent = skill;
        document.getElementById("skillsList").appendChild(div);
        skillInput.value = "";
      }
    });

   
    document.getElementById("addProjectBtn").addEventListener("click", () => {
      const name = document.getElementById("projName").value.trim();
      const desc = document.getElementById("projDesc").value.trim();
      const link = document.getElementById("projLink").value.trim();
      if(name && desc){
        projects.push({name,desc,link});
        const div = document.createElement("div");
        div.className = "list-item";
        div.textContent = `${name} - ${desc.substring(0,40)}...`;
        document.getElementById("projectsList").appendChild(div);
      }
    });

   
    document.getElementById("newProjectBtn").addEventListener("click", () => {
      document.getElementById("projName").value = "";
      document.getElementById("projDesc").value = "";
      document.getElementById("projLink").value = "";
    });

  
    document.getElementById("portfolioForm").addEventListener("submit", function(e){
      e.preventDefault();
      const data = {
        name: document.getElementById("name").value,
        aboutText: document.getElementById("aboutText").value,
        phrases,   
        skills,
        projects,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        linkedin: document.getElementById("linkedin").value,
      };
      const photoFile = document.getElementById("photo").files[0];
      if(photoFile){
        const reader = new FileReader();
        reader.onload = function(e){
          data.photo = e.target.result;
          localStorage.setItem("portfolioData", JSON.stringify(data));
          window.location.href = "portfolio.html";
        };
        reader.readAsDataURL(photoFile);
      } else {
        localStorage.setItem("portfolioData", JSON.stringify(data));
        window.location.href = "portfolio.html";
      }
    });
 