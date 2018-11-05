


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
    ['COPIAR']
  
    //['clean']                                         // remove formatting button
  ];  

myhandlers = {"COPIAR" : function(){
  htmlStr = quill.root.innerHTML;
  textStr = quill.getText();
  rtfStr = convertHtmlToRtf(htmlStr);
  copyToClip(rtfStr, htmlStr, textStr);
}};

var quill = new Quill('#editor', {
    modules: {
        toolbar:  {

          container : toolbarOptions,
          handlers : myhandlers

        }
      },
    theme: 'snow'
  });


function copyToClip(rtfStr, htmlStr, textStr) {
  function listener(e) {
    e.clipboardData.setData("application/rtf", rtfStr);
    // e.clipboardData.setData("application/msword", rtfStr);
    console.log(rtfStr);
    e.clipboardData.setData("text/html", htmlStr);
    e.clipboardData.setData("text/plain", textStr);
    e.preventDefault();
  }
  document.addEventListener("copy", listener);
  document.execCommand("copy");
  document.removeEventListener("copy", listener);
};
  
  // inserts template to quill, changes click template
  function format_template(exam, usg) {
    tecniqueTitle = '';
    analysisTitle = '';
    if (exam.tecnique) {
      tecniqueTitle = "\nTécnica\n";
      analysisTitle = '\nAnálise\n';
    }
    conclusaoTitle = "";
    if (usg){
      conclusaoTitle = "Conclusão\n"
    }
    
    quill.setContents([
        { insert: exam.title + '\n', attributes: {bold: true, align: 'center'} },
        { insert: tecniqueTitle, attributes: {bold: true, align: 'justify'} },
        { insert: exam.tecnique + '\n'},
        { insert: analysisTitle, attributes : {bold: true, align: 'justify'} },
        { insert:  exam.body + '\n\n', attributes: {align: 'justify'}},
        { insert : conclusaoTitle, attributes : {bold: true} },
        { insert: exam.conc}
      ]);

      // insert click form
      if (exam.name) {
        if (form_templates[exam.name]) {
          
          div_tags = 
          `<div class="fb-button form-group field-button-1540577184864 row"><div class="col-8">` + exam.nickname +
          `</div><div class=col"><button type="button" class="btn btn-success" name="button-1540577184864" style="success; float:right" id="button-1540577184864" onclick="submit_laudo.` + exam.name + `();event.stopPropagation();">Laudo</button></div>
          </div>`;

          collpasible_app.change_name(div_tags, form_templates[exam.name]);
          setTimeout(function(){ $('.form_select_init').formSelect();; }, 500);
          // $("#form_div").html(form_templates[exam.name]);

        }
        else {
          collpasible_app.change_name("<p>-</p>", "<p>-</p>");
        }
      }
  }




  function convertHtmlToRtf(html) {
    if (!(typeof html === "string" && html)) {
        return null;
    }

    var tmpRichText, hasHyperlinks;
    var richText = html;

    // Singleton tags
    richText = richText.replace(/<(?:hr)(?:\s+[^>]*)?\s*[\/]?>/ig, "{\\pard \\brdrb \\brdrs \\brdrw10 \\brsp20 \\par}\n{\\pard\\par}\n");
    richText = richText.replace(/<(?:br)(?:\s+[^>]*)?\s*[\/]?>/ig, "{\\pard\\par}\n");

    // Empty tags
    richText = richText.replace(/<(?:p|div|section|article)(?:\s+[^>]*)?\s*[\/]>/ig, "{\\pard\\par}\n");
    richText = richText.replace(/<(?:[^>]+)\/>/g, "");

    // Hyperlinks
    richText = richText.replace(
        /<a(?:\s+[^>]*)?(?:\s+href=(["'])(?:javascript:void\(0?\);?|#|return false;?|void\(0?\);?|)\1)(?:\s+[^>]*)?>/ig,
        "{{{\n");
    tmpRichText = richText;
    richText = richText.replace(
        /<a(?:\s+[^>]*)?(?:\s+href=(["'])(.+)\1)(?:\s+[^>]*)?>/ig,
        "{\\field{\\*\\fldinst{HYPERLINK\n \"$2\"\n}}{\\fldrslt{\\ul\\cf1\n");
    hasHyperlinks = richText !== tmpRichText;
    richText = richText.replace(/<a(?:\s+[^>]*)?>/ig, "{{{\n");
    richText = richText.replace(/<\/a(?:\s+[^>]*)?>/ig, "\n}}}");

    // Start tags
    richText = richText.replace(/<(?:b|strong)(?:\s+[^>]*)?>/ig, "{\\b\n");
    richText = richText.replace(/<(?:i|em)(?:\s+[^>]*)?>/ig, "{\\i\n");
    richText = richText.replace(/<(?:u|ins)(?:\s+[^>]*)?>/ig, "{\\ul\n");
    richText = richText.replace(/<(?:strike|del)(?:\s+[^>]*)?>/ig, "{\\strike\n");
    richText = richText.replace(/<sup(?:\s+[^>]*)?>/ig, "{\\super\n");
    richText = richText.replace(/<sub(?:\s+[^>]*)?>/ig, "{\\sub\n");
    richText = richText.replace(/<(?:p|div|section|article)(?:\s+[^>]*)?>/ig, "{\\pard\n");

    // End tags
    richText = richText.replace(/<\/(?:p|div|section|article)(?:\s+[^>]*)?>/ig, "\n\\par}\n");
    richText = richText.replace(/<\/(?:b|strong|i|em|u|ins|strike|del|sup|sub)(?:\s+[^>]*)?>/ig, "\n}");

    // Strip any other remaining HTML tags [but leave their contents]
    richText = richText.replace(/<(?:[^>]+)>/g, "");

    // Prefix and suffix the rich text with the necessary syntax
    richText =
        "{\\rtf1\\ansi\n" + (hasHyperlinks ? "{\\colortbl\n;\n\\red0\\green0\\blue255;\n}\n" : "") + richText +
        "\n}";

    return richText;
}







// TEMPLATES TEMPLATES TEMPLATES TEMPLATES TEMPLATES TEMPLATES TEMPLATES
// TEMPLATES TEMPLATES TEMPLATES TEMPLATES TEMPLATES TEMPLATES TEMPLATES
// TEMPLATES TEMPLATES TEMPLATES TEMPLATES TEMPLATES TEMPLATES TEMPLATES

    // TRIGGERS TRIGGERS TRIGGERS
    // TRIGGERS TRIGGERS TRIGGERS
    
    new Vue({
      el: '#usg_triggers',
      data: {
        modality: templates.usg.specialties,
      },
      methods : {
        change_specialty : function(specialty) {
          v_descriptors_ul.set_specialty(specialty);
        }
      }

    });
  
  
  new Vue({
       el: '#tc_triggers',
       data: {
         modality: templates.tc.specialties
       },
       methods : {
         change_specialty : function(specialty) {
           v_descriptors_ul.set_specialty(specialty);
         }
       }


     });

    new Vue({
      el: '#rm_triggers',
      data: {
        modality: templates.rm.specialties
      },
      methods : {
        change_specialty : function(specialty) {
          v_descriptors_ul.set_specialty(specialty);
        }
      }
      
    });



    // DROPDOWNDS DROPDOWNDS DROPDOWNDS
    // DROPDOWNDS DROPDOWNDS DROPDOWNDS

new Vue( {
  el: '#usg_dropdowns',
  data : {
    modality : templates.usg.specialties
  },
  methods : {
    html_format_template : function (exam) {
      format_template(exam, true);
    }
  }
});


new Vue( {
  el: '#tc_dropdowns',
  data : {
    modality : templates.tc.specialties
  },
  methods : {
    html_format_template : function (exam) {
      format_template(exam, false);
    }
  }
});

new Vue( {
  el: '#rm_dropdowns',
  data : {
    modality : templates.rm.specialties
  },
  methods : {
    html_format_template : function (exam) {
      format_template(exam, false);
    }
  }
});


// MODALITY SELECTORS MODALITY SELECTORS
// MODALITY SELECTORS MODALITY SELECTORS



// CLICKS CLICKS CLICKS
// CLICKS CLICKS CLICKS
// CLICKS CLICKS CLICKS
// click vue

$("#form_div").html();


collpasible_app = new Vue({ 
  el: '#app',
  mounted: function(){$('.collapsible').collapsible();},
  data: {
    cards: [
      { title: '', src: 'ultrasound_icon.png', description:''}
    ] 
  },
  methods : {
    change_name : function(newTitle, newDescription){
      this.cards[0].title = newTitle;
      this.cards[0].description = newDescription;
    }
  }
  });



  // $("#form_div").html(form_templates.ob_inicial);


// DESCRIPTORS DESCRIPTORS DESCRIPTORS DESCRIPTORS
// DESCRIPTORS DESCRIPTORS DESCRIPTORS DESCRIPTORS
// DESCRIPTORS DESCRIPTORS DESCRIPTORS DESCRIPTORS

// function to search  descriptors
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

// insert descriptor in quill
function format_descriptor(text) {

  try {
    selectionIndex = quill.getSelection().index;
  }
  catch(err) {
    quill.focus();
    selectionIndex = quill.getSelection().index;
    console.warn(err);
  }
    
  quill.insertText(selectionIndex, text);

}


// vue
v_descriptors_ul = new Vue( {
  el: '#descriptors_ul',
  data: {
    selected_modality : 'tc',
    selected_specialty : 'cep',
    v_descriptors : descriptors.cep.modalities.tc.findings
  },

  methods : {
    
    format_descriptor : format_descriptor,

    set_modality : function(new_modality) {
      this.selected_modality = new_modality;
      this.v_descriptors = descriptors[this.selected_specialty].modalities[this.selected_modality].findings;
    },

    set_specialty : function(new_specialty) {
      this.selected_specialty = new_specialty;
      this.v_descriptors = descriptors[this.selected_specialty].modalities[this.selected_modality].findings;
    },

    nl2br : function(text) {
      return nl2br(text);
    }

  },

});

// function to update v_descriptors_ul vue
function update_descriptors(specific_descriptors) {
  v_descriptors_ul.v_descriptors = specific_descriptors;
}





  $(document).ready(function(){

    $(".dropdown-trigger").dropdown({constrainWidth : false});
    $('.tabs').tabs();
    $('.form_select_init').formSelect();

  });


  function nl2br (str, is_xhtml) {
    if (typeof str === 'undefined' || str === null) {
        return '';
    }
    var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';
    return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
}