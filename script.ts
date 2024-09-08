window.addEventListener("DOMContentLoaded", () => {
  console.log("Script loaded");
  const toggleSkillsBtn = document.getElementById("toggle-skills-btn");
  const skillsSection = document.getElementById("skills");

  if (toggleSkillsBtn && skillsSection) {
    toggleSkillsBtn.addEventListener("click", () => {
      console.log("Button clicked");
      if (skillsSection.style.display === "block") {
        skillsSection.style.display = "none";
        toggleSkillsBtn.textContent = "Show Skills";
      } else {
        skillsSection.style.display = "block";
        toggleSkillsBtn.textContent = "Hide Skills";
      }
    });
  }
});



//....................forms section..................


const form = document.getElementById('resume-form') as HTMLFormElement;
const generateResumeBtn = document.getElementById('generate-resume-btn') as HTMLButtonElement;
const resumeContainer = document.getElementById('resume-container') as HTMLDivElement;

generateResumeBtn.addEventListener('click', (e) => {
    e.preventDefault();

    const name = (document.getElementById('name') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const phone = (document.getElementById('phone') as HTMLInputElement).value;
    const degree = (document.getElementById('degree') as HTMLInputElement).value;
    const university = (document.getElementById('university') as HTMLInputElement).value;
    const graduationDate = (document.getElementById('graduation-date') as HTMLInputElement).value;
    const jobTitle = (document.getElementById('job-title') as HTMLInputElement).value;
    const company = (document.getElementById('company') as HTMLInputElement).value;
    const employmentDates = (document.getElementById('employment-dates') as HTMLInputElement).value;
    const mySkills = (document.getElementById('my-skills') as HTMLTextAreaElement).value;

    const resumeData = {
        name,
        email,
        phone,
        degree,
        university,
        graduationDate,
        jobTitle,
        company,
        employmentDates,
        mySkills,
    };

    const resume = `
        <h1>Resume</h1>
        <section>
            <h2>Personal Information</h2>
            <p>Name: ${resumeData.name}</p>
            <p>Email: ${resumeData.email}</p>
            <p>Phone: ${resumeData.phone}</p>
        </section>
        <section>
            <h2>Education</h2>
            <p>Degree: ${resumeData.degree}</p>
            <p>University: ${resumeData.university}</p>
            <p>Graduation Date: ${resumeData.graduationDate}</p>
        </section>
        <section>
            <h2>Work Experience</h2>
            <p>Job Title: ${resumeData.jobTitle}</p>
            <p>Company: ${resumeData.company}</p>
            <p>Employment Dates: ${resumeData.employmentDates}</p>
        </section>
        <section>
            <h2>My Skills</h2>
            <p>${resumeData.mySkills}</p>
        </section>
    `;

    resumeContainer.innerHTML = resume;

      // Add this code here
      resumeContainer.innerHTML = resume;
      resumeContainer.contentEditable = 'true';
  
      let sectionId: string | null = null;
      let sectionContent: string | null =null;
  
      resumeContainer.addEventListener('input', (event: Event) => {
          const target = event.target as HTMLElement;
          const parentNode = target.parentNode as HTMLElement;
  
          if (parentNode) {
                sectionId = parentNode.getAttribute('id');
                sectionContent = parentNode.innerHTML;
    
                switch (sectionId) {
                    case 'personal-information':
                        resumeData.name = sectionContent.replace(/<[^>]*>/g, '').trim();
                        break;
                    case 'education':
                        resumeData.degree = sectionContent.replace(/<[^>]*>/g, '').trim();
                        break;
                    case 'work-experience':
                        resumeData.jobTitle = sectionContent.replace(/<[^>]*>/g, '').trim();
                        break;
                    case 'my-skills':
                        resumeData.mySkills = sectionContent.replace(/<[^>]*>/g, '').trim();
                        break;
                }
            }
    
            updatePreview();
        });
        const previewContainer = document.getElementById('preview-container') as HTMLDivElement;
    
        function updatePreview() {
            previewContainer.innerHTML = '';
            Object.keys(resumeData).forEach((key: string) => {
                const value = (resumeData as { [key: string]: string })[key];
                previewContainer.innerHTML += `<section id="${key}"> <p contenteditable="true">${value}</section>`;
            });
        }
    
        updatePreview();
    });

/*.......................................milestone 5.............................*/
