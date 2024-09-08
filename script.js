window.addEventListener("DOMContentLoaded", function () {
    console.log("Script loaded");
    var toggleSkillsBtn = document.getElementById("toggle-skills-btn");
    var skillsSection = document.getElementById("skills");
    if (toggleSkillsBtn && skillsSection) {
        toggleSkillsBtn.addEventListener("click", function () {
            console.log("Button clicked");
            if (skillsSection.style.display === "block") {
                skillsSection.style.display = "none";
                toggleSkillsBtn.textContent = "Show Skills";
            }
            else {
                skillsSection.style.display = "block";
                toggleSkillsBtn.textContent = "Hide Skills";
            }
        });
    }
});
//....................forms section..................
var form = document.getElementById('resume-form');
var generateResumeBtn = document.getElementById('generate-resume-btn');
var resumeContainer = document.getElementById('resume-container');
generateResumeBtn.addEventListener('click', function (e) {
    e.preventDefault();
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;
    var degree = document.getElementById('degree').value;
    var university = document.getElementById('university').value;
    var graduationDate = document.getElementById('graduation-date').value;
    var jobTitle = document.getElementById('job-title').value;
    var company = document.getElementById('company').value;
    var employmentDates = document.getElementById('employment-dates').value;
    var mySkills = document.getElementById('my-skills').value;
    var resumeData = {
        name: name,
        email: email,
        phone: phone,
        degree: degree,
        university: university,
        graduationDate: graduationDate,
        jobTitle: jobTitle,
        company: company,
        employmentDates: employmentDates,
        mySkills: mySkills,
    };
    var resume = "\n        <h1>Resume</h1>\n        <section>\n            <h2>Personal Information</h2>\n            <p>Name: ".concat(resumeData.name, "</p>\n            <p>Email: ").concat(resumeData.email, "</p>\n            <p>Phone: ").concat(resumeData.phone, "</p>\n        </section>\n        <section>\n            <h2>Education</h2>\n            <p>Degree: ").concat(resumeData.degree, "</p>\n            <p>University: ").concat(resumeData.university, "</p>\n            <p>Graduation Date: ").concat(resumeData.graduationDate, "</p>\n        </section>\n        <section>\n            <h2>Work Experience</h2>\n            <p>Job Title: ").concat(resumeData.jobTitle, "</p>\n            <p>Company: ").concat(resumeData.company, "</p>\n            <p>Employment Dates: ").concat(resumeData.employmentDates, "</p>\n        </section>\n        <section>\n            <h2>My Skills</h2>\n            <p>").concat(resumeData.mySkills, "</p>\n        </section>\n    ");
    resumeContainer.innerHTML = resume;
    // Add this code here
    resumeContainer.innerHTML = resume;
    resumeContainer.contentEditable = 'true';
    var sectionId = null;
    var sectionContent = null;
    resumeContainer.addEventListener('input', function (event) {
        var target = event.target;
        var parentNode = target.parentNode;
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
    var previewContainer = document.getElementById('preview-container');
    function updatePreview() {
        previewContainer.innerHTML = '';
        Object.keys(resumeData).forEach(function (key) {
            var value = resumeData[key];
            previewContainer.innerHTML += "<section id=\"".concat(key, "\"> <p contenteditable=\"true\">").concat(value, "</section>");
        });
    }
    updatePreview();
});
var form = document.getElementById('resume-form');
var previewContainer = document.getElementById('preview-container');
var resumeData = {
    username: '',
    resumeData: '',
};
form.addEventListener('submit', function (e) {
    e.preventDefault();
    var username = document.getElementById('username').value;
    var resumeDataValue = document.getElementById('resume-data').value;
    resumeData = {
        username: username,
        resumeData: resumeDataValue,
    };
    updatePreview();
});
function updatePreview() {
    previewContainer.innerHTML = '';
    for (var key in resumeData) {
        var value = resumeData[key];
        previewContainer.innerHTML += "<section id=\"".concat(key, "\">").concat(value, "</section>");
    }
}
var shareBtn = document.createElement('button');
shareBtn.textContent = 'Share';
shareBtn.addEventListener('click', function () {
    var uniqueUrl = generateUniqueUrl(resumeData.username);
    var shareableLink = createShareableLink(uniqueUrl);
    console.log("Shareable link: ".concat(shareableLink));
});
previewContainer.appendChild(shareBtn);
var downloadBtn = document.createElement('button');
downloadBtn.textContent = 'Download';
downloadBtn.addEventListener('click', function () {
    var pdfDoc = generatePdf(resumeData.resumeData);
    var pdfBuffer = Buffer.from(pdfDoc, 'binary');
    fs.writeFileSync("".concat(resumeData.username, "-resume.pdf"), pdfBuffer);
});
previewContainer.appendChild(downloadBtn);
function generateUniqueUrl(username) {
    var hash = crypto.createHash('sha256');
    hash.update(username);
    return "".concat(username, ".vercel.app/").concat(hash.digest('hex'));
}
function createShareableLink(url) {
    return shortUrl(url);
}
function generatePdf(resumeData) {
    var pdfDoc = new pdfkit();
    pdfDoc.text(resumeData, 100, 100);
    pdfDoc.end();
    return pdfDoc;
}
