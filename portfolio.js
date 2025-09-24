
    const typedTextElement = document.getElementById('typed-text');
    const userdata = JSON.parse(localStorage.getItem("portfolioData"));
    const phrases = (userdata && userdata.phrases && userdata.phrases.length > 0) 
  ? userdata.phrases 
  : ['Java Developer','Web Enthusiast','Problem Solver','Tech Learner'];
    let phraseIndex=0,letterIndex=0,currentText='',isDeleting=false;
    function type(){
      const currentPhrase = phrases[phraseIndex];
      if(!isDeleting){
        currentText = currentPhrase.substring(0,letterIndex+1);
        letterIndex++; typedTextElement.textContent=currentText;
        if(letterIndex===currentPhrase.length){isDeleting=true;setTimeout(type,1500);return;}
      } else {
        currentText=currentPhrase.substring(0,letterIndex-1);
        letterIndex--; typedTextElement.textContent=currentText;
        if(letterIndex===0){isDeleting=false;phraseIndex=(phraseIndex+1)%phrases.length;}
      }
      setTimeout(type,isDeleting?50:120);
    }


    const sections=document.querySelectorAll('.section');
    function checkSectionVisibility(){
      const triggerBottom=window.innerHeight*0.85;
      sections.forEach(section=>{
        const sectionTop=section.getBoundingClientRect().top;
        if(sectionTop<triggerBottom){section.classList.add('visible');}
      });
    }


    const hamburger=document.getElementById('hamburger');
    const navLinks=document.getElementById('navLinks');
    const darkModeToggle=document.getElementById('darkModeToggle');
    hamburger.addEventListener('click',()=>{navLinks.classList.toggle('show');});
    darkModeToggle.addEventListener('click',()=>{
      document.body.classList.toggle('dark-mode');
      darkModeToggle.innerHTML=document.body.classList.contains('dark-mode')?'<i class="fas fa-sun"></i>':'<i class="fas fa-moon"></i>';
    });

    window.addEventListener('load',()=>{type();checkSectionVisibility();});
    window.addEventListener('scroll',checkSectionVisibility);

    const data=JSON.parse(localStorage.getItem("portfolioData"));
    if(data){
      document.querySelector(".logo").textContent=data.name;
      document.querySelector(".hero .name").textContent=data.name;
      document.getElementById("aboutPara").textContent=data.aboutText;
      document.getElementById("footerName").textContent=data.name;

      const skillsList=document.getElementById("skillsList");
      skillsList.innerHTML="";
      (data.skills || []).forEach(skill=>{
        let li=document.createElement("li");
        li.textContent=skill;
        skillsList.appendChild(li);
      });


      const projectsGrid=document.getElementById("projectsGrid");
      projectsGrid.innerHTML="";
      (data.projects || []).forEach(project=>{
        const card=document.createElement("div");
        card.className="project-card";
        card.innerHTML=`
          <h3>${project.name}</h3>
          <p>${project.desc}</p>
          ${project.link ? `<a href="${project.link}" target="_blank" class="btn-secondary">View Project</a>` : ""}
        `;
        projectsGrid.appendChild(card);
      });


      document.getElementById("userEmail").textContent=data.email;
      document.getElementById("userEmail").href="mailto:"+data.email;
      document.getElementById("userPhone").textContent="Phone: "+data.phone;
      document.getElementById("userLinkedin").textContent=data.linkedin;
      document.getElementById("userLinkedin").href=data.linkedin;


      if(data.photo){document.getElementById("userPhoto").src=data.photo;}
    }
