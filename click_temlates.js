submit_laudo = {
    ob_tardio : function() {
      try {

        DBP = $('#form_dbp')[0].value || "***";
        CC = $('#form_cc')[0].value || "***";
        CA = $('#form_ca')[0].value || "***";
        CF = $('#form_cf')[0].value || "***";
        BCF = $('#form_bcf')[0].value || "***";
        ILA = $('#form_ila')[0].value || "***";
        bcf_ausente = $('#bcf_ausente')[0].checked;
        dorso = $('#form_dorso').val();
        apresentacao = $('#form_apresentacao').val();
      }
      catch(e){
        console.warn("Error in ob_tardio calculus");
        console.warn(e);
      }
      calculated_age = calculate_efw_and_gestational(DBP, CC, CA, CF);
      EFW = calculated_age.efw || "***";
      WEEKS = calculated_age.weeks || "***";
      DAYS = calculated_age.days || "***";
      if (DAYS > 1)
        days_plural = 's';
      else
        days_plural = '';

      if (bcf_ausente) {
        bcf_message = "\nAusência de batimentos cardíacos fetais.";
        bcf_conc = "\nAusência de batimentos cardíacos fetais, compatível com óbito fetal";
      } else {
        bcf_message = "\nO feto apresenta sinais vitais presentes, representados por movimentação ativa e batimentos cardíacos.\nBCF: " + BCF + " bpm.";
        bcf_conc = "\nGestação única, tópica, de concepto vivo.";
      }

    
      quill.setContents([
          {insert : "ULTRASSONOGRAFIA OBSTÉTRICA\n\n", attributes : {bold : true, align : "center"}},
          {insert : "Feto único, em  apresentação " + (apresentacao || "***") + ", com dorso à " + (dorso || "***") + "." + bcf_message +  "\nPlacenta de localização ***, com aspecto compatível com grau *** de Grannum. Espessura de *** mm.\n\n", attributes : {bold : false}},
          {insert : "Parâmetros biométricos:\n", attributes : {bold : true}},
          {insert : "Diâmetro biparietal (DBP): " + (10*DBP || "***") + " mm.\nCircunferência cefálica (CC): " + (10*CC || "***") + " mm.\nCircunferência abdominal (CA): " + (10*CA || "***") + " mm.\nComprimento femoral (CF): " + (10*CF || "***") + " mm.\nPeso fetal em torno de " + EFW + " gramas (+/- 15%).\n\n", attributes : {bold : false}},
          {insert : "Líquido amniótico:\n", attributes : {bold : true}},
          {insert : "Volume de líquido amniótico subjetivamente normal. ILA= " + (10*ILA || "***") + " mm.\n\n", attributes : {bold : false}},
          {insert : "Conclusão:", attributes : {bold : true}},
          {insert : bcf_conc + "\nBiometria média compatível com " + WEEKS + " semanas e " + DAYS + " dia" + days_plural + " (variação de até +/- 8 %).\n\n"}


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