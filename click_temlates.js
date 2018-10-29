submit_laudo = {
    ob_tardio : function() {
      try {

        DBP = $('#form_dbp')[0].value;
        CC = $('#form_cc')[0].value;
        CA = $('#form_ca')[0].value;
        CF = $('#form_cf')[0].value;
        BCF = $('#form_bcf')[0].value;
        ILA = $('#form_ila')[0].value;
      }
      catch(e){
        console.warn("Error in ob_tardio calculus");
        console.warn(e);
      }
      calculated_age = calculate_efw_and_gestational(DBP, CC, CA, CF);
      EFW = calculated_age.efw;
      WEEKS = calculated_age.weeks;
      DAYS = calculated_age.days;
    
      quill.setContents([
          {insert : "ULTRASSONOGRAFIA OBSTÉTRICA\n\n", attributes : {bold : true, align : "center"}},
          {insert : "Feto único, em  apresentação ***, com dorso à ***.\nO feto apresenta sinais vitais presentes, representados por movimentação ativa e batimentos cardíacos.\nBCF: " + BCF + " bpm.\nPlacenta de localização ***, com aspecto compatível com grau *** de Grannum. Espessura de *** mm.\n\n", attributes : {bold : false}},
          {insert : "Parâmetros biométricos:\n", attributes : {bold : true}},
          {insert : "Diâmetro biparietal (DBP): " + 10*DBP + " mm.\nCircunferência cefálica (CC): " + 10*CC + " mm.\nCircunferência abdominal (CA): " + 10*CA + " mm.\nComprimento femoral (CF): " + CF + " mm.\nPeso fetal em torno de " + EFW + " gramas (+/- 15%).\n\n", attributes : {bold : false}},
          {insert : "Líquido amniótico:\n", attributes : {bold : true}},
          {insert : "Volume de líquido amniótico subjetivamente normal. ILA= " + 10*ILA + " mm.\n\n", attributes : {bold : false}},
          {insert : "Conclusão:\n", attributes : {bold : true}},
          {insert : "Gestação única, tópica, de concepto vivo.\nBiometria média compatível com " + WEEKS + " semanas e " + DAYS + " dias (variação de até +/- 8 %).\n\n"}


      ]);
    
    
    
    
    
    
    }
  }









  function calculate_efw_and_gestational(BPD, HC, AC, FL) {
    
    weight = Math.pow(10, 1.3596 + (0.0064*HC) + (0.00061*BPD*AC) + (0.0424*AC) + (0.174*FL) - (0.00386*AC*FL));
    weight = Math.round(weight);

    GA = 10.85 + (0.060*HC*FL) + (0.6700*BPD) + (0.1680*AC);
    GAint = Math.floor(GA);
    GAfloat = GA % 1;
    
    inputY = GAfloat;

    xMin = 0;
    xMax = 7;
    yMax = 0;
    yMin = 1;
    
    percent = (inputY - yMin) / (yMax - yMin);
    days = percent * (xMax - xMin) + xMin;
    
    weeks = GAint;
    days = Math.round(days);
    return { 
      weeks : weeks,
      days : days,
      efw : weight
    }
  }