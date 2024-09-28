// Function to dynamically add more skills
function addSkill() {
    const skillInput = document.createElement('input');
    skillInput.setAttribute('type', 'text');
    skillInput.setAttribute('class', 'skill-input');
    skillInput.setAttribute('placeholder', 'Enter your skill');
    document.getElementById('skills-container').appendChild(skillInput);
}

// Function to dynamically add more education fields
function addEducation() {
    const educationDiv = document.createElement('div');
    educationDiv.classList.add('education-entry');

    const instituteInput = document.createElement('input');
    instituteInput.setAttribute('type', 'text');
    instituteInput.setAttribute('class', 'education-institute');
    instituteInput.setAttribute('placeholder', 'Institution Name');

    const degreeInput = document.createElement('input');
    degreeInput.setAttribute('type', 'text');
    degreeInput.setAttribute('class', 'education-degree');
    degreeInput.setAttribute('placeholder', 'Degree');

    const yearInput = document.createElement('input');
    yearInput.setAttribute('type', 'text');
    yearInput.setAttribute('class', 'education-year');
    yearInput.setAttribute('placeholder', 'Year (e.g., 2020-2024)');

    educationDiv.appendChild(instituteInput);
    educationDiv.appendChild(degreeInput);
    educationDiv.appendChild(yearInput);

    document.getElementById('education-container').appendChild(educationDiv);
}

// Function to generate the resume preview
function generateResume() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const about = document.getElementById('about').value;
    const experience = document.getElementById('experience').value;

    // Skills
    const skillInputs = document.querySelectorAll('.skill-input');
    const skillsList = document.getElementById('previewSkills');
    skillsList.innerHTML = ''; // Clear previous skills
    skillInputs.forEach(input => {
        const li = document.createElement('li');
        li.textContent = input.value;
        skillsList.appendChild(li);
    });

    // Education
    const educationEntries = document.querySelectorAll('.education-entry');
    const educationList = document.getElementById('previewEducation');
    educationList.innerHTML = ''; // Clear previous education
    educationEntries.forEach(entry => {
        const institute = entry.querySelector('.education-institute').value;
        const degree = entry.querySelector('.education-degree').value;
        const year = entry.querySelector('.education-year').value;
        const li = document.createElement('li');
        li.textContent = `${degree} from ${institute} (${year})`;
        educationList.appendChild(li);
    });

    // Set values in the preview
    document.getElementById('previewName').textContent = name;
    document.getElementById('previewEmail').textContent = email;
    document.getElementById('previewPhone').textContent = phone;
    document.getElementById('previewAbout').textContent = about;
    document.getElementById('previewExperience').textContent = experience;

    // Show the resume preview
    document.getElementById('resumePreview').style.display = 'block';
}

// Function to download the resume as PDF
function downloadPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Resume data
    const name = document.getElementById('previewName').textContent;
    const email = document.getElementById('previewEmail').textContent;
    const phone = document.getElementById('previewPhone').textContent;
    const about = document.getElementById('previewAbout').textContent;
    const experience = document.getElementById('previewExperience').textContent;
    const skills = Array.from(document.querySelectorAll('#previewSkills li')).map(li => li.textContent).join(', ');
    const education = Array.from(document.querySelectorAll('#previewEducation li')).map(li => li.textContent).join('\n');

    // Add content to PDF
    doc.setFontSize(24);
    doc.text(name, 105, 20, null, null, 'center'); // Centered name

    doc.setFontSize(12);
    doc.text(`Email: ${email}`, 10, 40);
    doc.text(`Phone: ${phone}`, 10, 50);
    doc.text(`About: ${about}`, 10, 60);
    doc.text(`Experience: ${experience}`, 10, 70);
    doc.text(`Skills: ${skills}`, 10, 80);
    doc.text(`Education:\n${education}`, 10, 90);

    // Save PDF
    doc.save('resume.pdf');
}
