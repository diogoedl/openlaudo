
new Vue({ 
  el: '#app',
  mounted: function(){$('.collapsible').collapsible();},
  data: {
    cards: [
      { title: 'Ultrasound clicks', src: 'ultrasound_icon.png', description:'...'}
    ]
  }
  })









//  QUILL  QUILL  QUILL  QUILL  QUILL  QUILL  QUILL  QUILL

var toolbarOptions = [
    [{ 'font': [] }],
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    //['blockquote', 'code-block'],
  
    //[{ 'header': 1 }, { 'header': 2 }],               // custom button values
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
    [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
    //[{ 'direction': 'rtl' }],                         // text direction
  
    //[{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  
    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'align': [] }],
  
    //['clean']                                         // remove formatting button
  ];  


var quill = new Quill('#editor', {
    modules: {
        toolbar: toolbarOptions
      },
    theme: 'snow'
  });

  
  function format_template(exam) {
    tecniqueTitle = '';
    if (exam.reportTecnique) {
      tecniqueTitle = "Técnica\n";
    }
    
    quill.setContents([
        { insert: exam.title + '\n', attributes: {bold: true, align: 'center'} },
        { insert: tecniqueTitle, attributes: {bold: true, align: 'justify'} },
        { insert: exam.tecnique + '\n'},
        { insert: exam.body + '\n\n', attributes: {align: 'justify'}},
        { insert : 'Conclusão:\n', attributes : {bold: true} },
        { insert: exam.conc}
      ]);
  }












// TEMPLATES TEMPLATES TEMPLATES TEMPLATES TEMPLATES TEMPLATES TEMPLATES
// TEMPLATES TEMPLATES TEMPLATES TEMPLATES TEMPLATES TEMPLATES TEMPLATES
// TEMPLATES TEMPLATES TEMPLATES TEMPLATES TEMPLATES TEMPLATES TEMPLATES



  // $('#usg_abdome_total').click(function() {
  //     format_template(templates.usg_abdome_total.title, '', templates.usg_abdome_total.corpo, templates.usg_abdome_total.conc);
  //   });
  // $('#usg_abdome_superior').click(function() {
  //   format_template(templates.usg_abdome_superior.title, '', templates.usg_abdome_superior.corpo, templates.usg_abdome_superior.conc);
  //   });
  
    // iterate over specialties inside modality
    for(specialty in templates.usg) {
      // iterate over exams inside specialty
      for (exam in specialty.mascaras) {
        
      }
    }
    
    new Vue({
      el: '#usg_triggers',
      data: {
        modality: templates.usg
      }
    });
  
  
  new Vue({
       el: '#tc_triggers',
       data: {
         modality: templates.tc
       }
     });

    new Vue({
      el: '#rm_triggers',
      data: {
        modality: templates.rm
      }
    });



        
new Vue( {
  el: '#usg_dropdowns',
  data : {
    modality : templates.usg
  },
  methods : {
    html_format_template : function (exam) {
      format_template(exam);
    }
  }
});

    
new Vue( {
  el: '#tc_dropdowns',
  data : {
    modality : templates.tc
  },
  methods : {
    html_format_template : function (exam) {
      format_template(exam);
    }
  }
});

new Vue( {
  el: '#rm_dropdowns',
  data : {
    modality : templates.rm
  },
  methods : {
    html_format_template : function (exam) {
      format_template(exam);
    }
  }
});






// FILTER FUNCTION  FILTER FUNCTION

function myFunction() {
  var input, filter, ul, li, a, i;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  ul = document.getElementById("descriptors_ul");
  li = ul.getElementsByTagName("li");
  for (i = 0; i < li.length; i++) {
      a = li[i].getElementsByTagName("a")[0];
      if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
          li[i].style.display = "";
      } else {
          li[i].style.display = "none";
      }
  }
}

function format_descriptor(text) {

  selectionIndex = quill.getSelection().index;

  quill.insertText(selectionIndex, text);

}



new Vue( {
el: '#descriptors_ul',
  data: {
    v_descriptors : descriptors.cep.tc
  },

  methods : {
    format_descriptor : format_descriptor
  }
});










  $(document).ready(function(){

    $(".dropdown-trigger").dropdown({constrainWidth : false});
    $('.tabs').tabs();

  })