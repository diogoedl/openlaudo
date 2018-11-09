# openlaudo
Web tool for radiology report editing


Live demo at http://18.218.57.67/openlaudo/editor.html

editor.html:
Html file for the single-page application.

form_templates.js:
Contains the clickable forms for each report type. Each form (in html format) is a property of a JavaScript object called form_templates.

click_templates.js:
Contains the functions tha run when a report from a clickable form is generated. These functions are responsible for getting the input values of the forms, making calculations and priting the resulting report to the Quill Editor.

sidebar.js
Main js file for the rendering of dynamic GUI content. Contains Vue functionsthat render menus and descriptors, and also functions to handle/insert the contet of the Quill editor;

descriptors.js , descriptors.json:
Structured file of all descriptors divided into specialty -> modality. JSON file easyer for editing with JSON editors and js file easyer for importing in the <head> tag.

templates.js , templates.json:
Structured file of all report templates (non clickable templates) divided into modality -> specialty. JSON file easyer for editing with JSON editors and js file easyer for importing in the <head> tag.


quill.js , index.html:
Once for testing, no longer used.

