(() => {
  const data = {
    polar: {name:'Polar Fleece',en:'Polar Fleece',image:'assets/fab-polar.png',description:'Brushing adds a soft surface to knitted fabric. The feel varies with brushing direction, intensity and weight.',facts:[['Surface','Texture created by brushing'],['Applications','Products requiring a brushed surface, such as blankets'],['Specifications to discuss','Single- or double-sided brushing, weight and width']]},
    interlock: {name:'Interlock',en:'Interlock',image:'assets/fab-interlock.png',second:'assets/interlock-surface.jpeg',description:'Interlock is a double-knit fabric. Surface and thickness vary with yarn, knitting and finishing conditions.',facts:[['Construction','Double-knit construction'],['Applications','Used as a backing fabric for bonding, among other applications'],['Specifications to discuss','Bonding material and greige or finished state']]},
    tr: {name:'T/R Single',en:'T/R Single',image:'assets/fab-tr.png',description:'T/R refers to a polyester and rayon blend. The surface varies with yarn blend, knitting and finishing.',facts:[['Yarn and construction','Single-knit polyester and rayon blend'],['Specifications to discuss','Yarn blend and required fabric state'],['Starting point','Your current fabric or a sample']]},
    dty: {name:'DTY Single',en:'DTY Single',image:'assets/fab-dty.png',description:'DTY is a processed filament yarn. Surface and feel vary with yarn type, knitting and finishing.',facts:[['Yarn and construction','Single-knit fabric using DTY yarn'],['Specifications to discuss','Yarn, knitting and finishing conditions'],['Starting point','Your current fabric or desired feel']]},
    bodre: {name:'Bodre',en:'Bodre',image:'assets/fab-bodre.png',second:'assets/fab-bodre-second.jpeg',description:'Bodre is an interlock fabric made with FDY yarn. Surface and thickness vary with yarn and finishing conditions.',facts:[['Yarn and construction','Interlock using FDY yarn'],['Specifications to discuss','Desired fabric and finishing'],['Starting point','A Bodre sample or intended use']]}
  };
  const dialog=document.querySelector('.fabric-dialog'); if(!dialog || !dialog.showModal) return;
  const title=document.querySelector('#fabric-modal-title'), english=document.querySelector('#modal-english'), desc=document.querySelector('#fabric-modal-description'), photo=document.querySelector('#modal-image'), facts=document.querySelector('#modal-facts'), secondary=document.querySelector('#modal-secondary'), secondPhoto=document.querySelector('#modal-second-image'), inquiry=document.querySelector('#modal-inquiry');

  const locale={"consult": "For your inquiry", "help": "A fabric name or sample is enough to get started. We will discuss specifications and availability.", "back": "View other fabrics", "ask": "Inquire about this fabric", "photos": "Reference images", "one": "Reference image", "alt": "reference image"}, conditions={"polar": "Application · brushing · weight and width", "interlock": "Application · fabric state · weight and width", "tr": "Application · yarn blend · weight and width", "dty": "Application · yarn · desired feel", "bodre": "Application · fabric state · finishing"};
  const sheet=dialog.querySelector('.modal-sheet'),art=dialog.querySelector('.modal-art'),body=dialog.querySelector('.modal-body');
  const legacy=[...body.children];
  const mobileTitle=dialog.querySelector('.modal-mobile-title');
  const mobileInquiry=dialog.querySelector('.modal-mobile-actions .modal-inquiry');
  mobileInquiry.querySelector('.inquiry-label').textContent=locale.ask;
  const gallery=document.createElement('div'); gallery.className='interlock-gallery';
  gallery.innerHTML='<span class="gallery-label"></span><div class="gallery-controls"></div>'; art.append(gallery);
  const detail=document.createElement('div'); detail.className='interlock-detail';
  detail.innerHTML=`<p class="interlock-eyebrow">HWOASUNG FABRICS <span class="detail-number"></span></p>
    <h3 id="fabric-study-title"><span class="detail-name"></span><span class="detail-en"></span></h3>
    <p id="fabric-study-description" class="interlock-description"></p>
    <div class="interlock-info"><div><span class="fact-label-0"></span><p class="fact-value-0"></p></div><div><span class="fact-label-1"></span><p class="fact-value-1"></p></div></div>
    <div class="interlock-consult"><span class="consult-title"></span><p class="consult-conditions"></p><small class="consult-help"></small></div>
    <div class="interlock-actions"><a class="modal-inquiry" href="#"><span class="inquiry-label"></span><span aria-hidden="true">↗</span></a><button class="interlock-back" type="button"><span class="back-label"></span> <span aria-hidden="true">→</span></button></div>`;
  const actions=detail.querySelector('.interlock-actions');
  body.append(detail, actions); detail.querySelector('.consult-title').textContent=locale.consult; detail.querySelector('.consult-help').textContent=locale.help; actions.querySelector('.back-label').textContent=locale.back; actions.querySelector('.inquiry-label').textContent=locale.ask;
  actions.querySelector('.interlock-back').addEventListener('click',()=>closeDialog());
  let previousFocus=null;
  function show(key,addHistory){
    const item=data[key];if(!item)return;if(!dialog.open)previousFocus=document.activeElement;
    const keys=['polar','interlock','tr','dty','bodre']; const photos=[item.image,...(item.second?[item.second]:[])];
    sheet.classList.add('interlock-study');legacy.forEach(node=>node.hidden=true);
    dialog.setAttribute('aria-labelledby','fabric-study-title');dialog.setAttribute('aria-describedby','fabric-study-description');
    detail.querySelector('.detail-number').textContent=String(keys.indexOf(key)+1).padStart(2,'0')+' / 05';
    mobileTitle.textContent=item.name;
    detail.querySelector('.detail-name').textContent=item.name;detail.querySelector('.detail-en').textContent=item.en.toUpperCase();
    detail.querySelector('.interlock-description').textContent=item.description;
    item.facts.slice(0,2).forEach(([label,value],i)=>{detail.querySelector('.fact-label-'+i).textContent=label;detail.querySelector('.fact-value-'+i).textContent=value;});
    detail.querySelector('.consult-conditions').textContent=conditions[key];
    actions.querySelector('.modal-inquiry').href='inquiry.html?'+(true ? 'lang=en&':'')+'fabric='+encodeURIComponent(item.name);
    mobileInquiry.href=actions.querySelector('.modal-inquiry').href;
    const controls=gallery.querySelector('.gallery-controls');controls.replaceChildren();
    function view(index){photo.src=photos[index];photo.alt=item.name+' '+locale.alt+' '+(index+1);gallery.querySelector('.gallery-label').textContent=photos.length>1?locale.photos+'  '+String(index+1).padStart(2,'0')+' / '+String(photos.length).padStart(2,'0'):locale.one;controls.querySelectorAll('button').forEach((button,i)=>button.setAttribute('aria-pressed',String(i===index)));}
    if(photos.length>1)photos.forEach((_,i)=>{const button=document.createElement('button');button.type='button';button.textContent=String(i+1).padStart(2,'0');button.setAttribute('aria-label',locale.photos+' '+(i+1));button.addEventListener('click',()=>view(i));controls.append(button);});view(0);
    if(!dialog.open){dialog.showModal();document.body.classList.add('modal-open');}dialog.scrollTop=0;sheet.scrollTop=0;detail.scrollTop=0;
    if(addHistory)history.pushState({fabricModal:true},'','#fabric-'+key);
  }
  function closeDialog(){if(!dialog.open)return;dialog.close();if(history.state&&history.state.fabricModal)history.back();else if(location.hash.startsWith('#fabric-'))history.replaceState(null,'',location.pathname+location.search)}
  document.querySelectorAll('.fabric-card-link[data-fabric]').forEach(link=>link.addEventListener('click',e=>{if(e.button!==0||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;e.preventDefault();show(link.dataset.fabric,true)}));
  dialog.querySelector('.modal-close').addEventListener('click',closeDialog);
  dialog.addEventListener('click',e=>{if(e.target===dialog)closeDialog()});dialog.addEventListener('cancel',e=>{e.preventDefault();closeDialog()});
  dialog.addEventListener('close',()=>{document.body.classList.remove('modal-open');if(previousFocus&&previousFocus.isConnected)previousFocus.focus()});
  window.addEventListener('popstate',()=>{const key=location.hash.match(/^#fabric-(polar|interlock|tr|dty|bodre)$/)?.[1];if(key)show(key,false);else if(dialog.open)dialog.close()});
  const initial=location.hash.match(/^#fabric-(polar|interlock|tr|dty|bodre)$/)?.[1];if(initial)show(initial,false);
})();
