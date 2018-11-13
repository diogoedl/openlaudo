form_templates = {
    ob_tardio : `<form id="rendered-form"><div class="rendered-form">
    <div class="">
      <h3 id="control-4928516">2º/3º trimestre</h3>
    </div>
    
    <div class="row idade-gestacional">
      <div class="col-5" style="padding:2px;">
        <div>
        <ul class="collapsible popout">
        <li style="margin:0px;">
          <div class="collapsible-header" style="padding:4  px;"><span class="headline white--text" style="margin-top:0px;">Idade gestacional</span>
          </div>
          <div class="collapsible-body white" id="form_div" style="padding:1px;padding-bottom:1px;"><span class="headline white--text">
          Data USG:<input id="form_usg_date" type=date style=""/>
          IG USG:
          <div class="row" style="padding-left: 10%; padding-right: 10%; margin-bottom:1px;">
            <div class="col" style="padding:0px;">
              <input type="number" id="form_usg_weeks" placeholder="semanas" style=""/>
            </div>
            <div class="col" style="padding:0px;">
              <input type="number" id="form_usg_days" placeholder="dias" style=""/>
            </div> 
          </div>
          DUM:
          <input type="date" id="form_dum" placeholder="dias" style=""/>
          <button type="button" onclick="calculate_history()">Calcular</button>
          </span>            
          </div>
          
        
      </ul>
        </div>
      </div>
      <div class="col">
        <input type="number" placeholder="Semanas" class="form-control" name="form_semanas" step="1" id="form_semanas">
      </div>
      <div class="col">
        <input type="number" placeholder="Dias" class="form-control" name="form_dias" step="1" id="form_dias">
      </div>
    </div>

    <div class="row">
    
    <div class="col">
      <div class="fb-number form-group field-form_dbp">
        <label for="form_dbp" class="fb-number-label">DBP (mm)</label>
        <input type="number" placeholder="DBP (mm)" class="form-control" name="form_dbp" step="0.1" id="form_dbp"></div>
      <div class="fb-number form-group field-form_cc">
        <label for="form_cc" class="fb-number-label">CC (mm)</label>
        <input type="number" placeholder="CC (mm)" class="form-control" name="form_cc" step="0.1" id="form_cc"></div>
      <div class="fb-number form-group field-form_ca">
        <label for="form_ca" class="fb-number-label">CA (mm)</label>
        <input type="number" placeholder="CA (mm)" class="form-control" name="form_ca" step="0.1" id="form_ca"></div>
      <div class="fb-number form-group field-form_cf">
        <label for="form_cf" class="fb-number-label">CF (mm)</label>
        <input type="number" placeholder="CF (mm)" class="form-control" name="form_cf" step="0.1" id="form_cf"></div>
    </div>
    
    <div class="col">
      <div class="fb-number form-group field-form_bcf">
        <label for="form_bcf" class="fb-number-label">BCF</label>
        <input type="number" placeholder="BCF" class="form-control" name="form_bcf" step="1" id="form_bcf"></div>
      <div class="inputGroup">
        <label>
          <input type="checkbox" id="bcf_ausente" class="filled-in"/>
          <span>BCF ausente?</span>
        </label>
        
      </div>
      
      <div class="fb-number form-group field-number-1540578047417">
        <label for="number-1540578047417" class="fb-number-label">ILA (mm)</label>
        <input type="number" placeholder="ILA (mm)" class="form-control" name="number-1540578047417" step="0.1" id="form_ila">
      </div>
      <div class="input-field col">
        <select id="form_apresentacao" class="form_select_init" onchange="change_presentation()">
          <option value="***" disabled selected>...</option>
          <option value="cefálica">Cefálica</option>
          <option value="pélvica">Pélvica</option>
          <option value="córmica">Córmica</option>
        </select>
        <label>Apresentação</label>
      </div>
      <div class="input-field col">
        <select id="form_dorso" class="form_select_init">
          <option value="***" disabled selected>...</option>
          <option value="direita">Direita</option>
          <option value="esquerda">Esquerda</option>
        </select>
        <label id="form_dorso_label">Dorso</label>
      </div>
    </div>
    
     
    
    </div>
    
    </div>
    </form>`,


    ob_inicial : `<form id="rendered-form">
    <div class="rendered-form">
      <div class="">
        <h3 id="control-4928516">1º trimestre</h3>
      </div>
      <div class="row">

        <div class="fb-number form-group field-form_dbp form_sg">
          <label for="form_dbp" class="fb-number-label">SG 1 </label>
          <input type="number" placeholder="SG 1 (mm)" class="form-control" name="form_dbp" step="0.1" id="form_sg1"></div>
        <div class="fb-number form-group field-form_cc form_sg">
          <label for="form_cc" class="fb-number-label">SG 2</label>
          <input type="number" placeholder="SG 2 (mm)" class="form-control" name="form_cc" step="0.1" id="form_sg2"></div>
        <div class="fb-number form-group field-form_ca form_sg">
          <label for="form_ca" class="fb-number-label">SG 3</label>
          <input type="number" placeholder="SG 3 (mm)" class="form-control" name="form_ca" step="0.1" id="form_sg3"></div>
        <div class="fb-number form-group field-form_cf">
          <label for="form_cf" class="fb-number-label">CCN</label>
          <input type="number" placeholder="CCN (mm)" class="form-control" name="form_ccn" step="0.1" id="form_ccn"></div>


        <div class="fb-number form-group field-form_bcf">
          <label for="form_bcf" class="fb-number-label">BCF</label>
          <input type="number" placeholder="BCF" class="form-control" name="form_bcf" step="1" id="form_bcf"></div>
      </div>

      <div class="row">
        <div class="inputGroup col" style="margin-right:8px;">
          <label>
            <input type="checkbox" id="embriao_ausente" class="filled-in" />
            <span>Embrião ausente?</span>
          </label>
        </div>
        <div class="inputGroup col" style="margin-right:8px;">
          <label>
            <input type="checkbox" id="vesicula_ausente" class="filled-in" />
            <span>Vesícula ausente?</span>
          </label>
        </div>
      </div>

      <div class="row">
        <div class="inputGroup col" style="margin-right:50px;">
          <label>
            <input type="checkbox" id="bcf_ausente" class="filled-in" />
            <span>BCF ausente?</span>
          </label>
        </div>

    
      </div>
    </div>
  </form>`,



}