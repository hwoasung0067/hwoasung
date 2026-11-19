(() => {
  const data = {
    polar: {name:'폴라폴리스',en:'Polar Fleece',image:'assets/fab-polar.png',description:'편직 원단에 기모를 더해 포근한 표면을 만듭니다. 기모의 방향과 정도, 중량에 따라 느낌이 달라집니다.',facts:[['원단의 표면','기모 가공으로 형성된 질감'],['사용 맥락','담요처럼 기모 표면이 필요한 제품'],['확인할 조건','단면·양면 기모와 중량, 폭']]},
    interlock: {name:'인타록',en:'Interlock',image:'assets/fab-interlock.png',second:'assets/interlock-surface.jpeg',description:'인타록은 양면 편직 조직의 원단입니다. 원사와 편직, 가공 조건에 따라 표면과 두께감이 달라질 수 있습니다.',facts:[['원단의 조직','두 면이 연결되는 양면 편직 조직'],['사용 맥락','본딩용 바닥지 등으로 활용'],['확인할 조건','함께 붙일 소재와 생지·가공 상태']]},
    tr: {name:'T/R 싱글',en:'T/R Single',image:'assets/fab-tr.png',description:'T/R은 폴리에스터와 레이온의 조합을 뜻합니다. 원사 조합과 편직·가공 조건에 따라 표면의 느낌이 달라질 수 있습니다.',facts:[['원사와 조직','폴리에스터·레이온 조합의 싱글 편직'],['확인할 조건','원사 조합과 필요한 원단 상태'],['상담의 시작','사용 중인 원단이나 샘플']]},
    dty: {name:'DTY 싱글',en:'DTY Single',image:'assets/fab-dty.png',description:'DTY는 필라멘트에 가공을 더한 원사입니다. 원사의 종류와 편직·가공 조건에 따라 원단의 표면과 촉감이 달라질 수 있습니다.',facts:[['원사와 조직','DTY 원사를 활용하는 싱글 편직'],['확인할 조건','원사와 편직·가공 조건'],['상담의 시작','사용 중인 원단이나 원하는 촉감']]},
    bodre: {name:'보드레',en:'Bodre',image:'assets/fab-bodre.png',second:'assets/fab-bodre-second.jpeg',description:'보드레는 FDY 계열 원사를 활용하는 인터록 원단입니다. 원사와 가공 조건에 따라 표면의 느낌과 두께감이 달라질 수 있습니다.',facts:[['원사와 조직','FDY 계열 원사를 활용하는 인터록'],['확인할 조건','원하는 원단 상태와 가공'],['상담의 시작','사용 중인 보드레 샘플이나 제품의 용도']]}
  };
  const dialog=document.querySelector('.fabric-dialog'); if(!dialog || !dialog.showModal) return;
  const title=document.querySelector('#fabric-modal-title'), english=document.querySelector('#modal-english'), desc=document.querySelector('#fabric-modal-description'), photo=document.querySelector('#modal-image'), facts=document.querySelector('#modal-facts'), secondary=document.querySelector('#modal-secondary'), secondPhoto=document.querySelector('#modal-second-image'), inquiry=document.querySelector('#modal-inquiry');

  const locale={"consult": "상담할 때 함께 살펴봅니다", "help": "원단명이나 샘플만 있어도 괜찮습니다. 필요한 사양과 공급 가능성을 함께 확인합니다.", "back": "다른 원단 보기", "ask": "이 원단 문의하기", "photos": "소재 참고 이미지", "one": "소재 참고 이미지", "alt": "소재 참고 이미지"}, conditions={"polar": "사용 용도 · 기모 방향 · 중량과 폭", "interlock": "사용 용도 · 원단 상태 · 중량과 폭", "tr": "사용 용도 · 원사 조합 · 중량과 폭", "dty": "사용 용도 · 원사 · 원하는 촉감", "bodre": "사용 용도 · 원단 상태 · 가공 조건"};
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
  body.append(detail); detail.querySelector('.consult-title').textContent=locale.consult; detail.querySelector('.consult-help').textContent=locale.help; detail.querySelector('.back-label').textContent=locale.back; detail.querySelector('.inquiry-label').textContent=locale.ask;
  detail.querySelector('.interlock-back').addEventListener('click',()=>closeDialog());
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
    detail.querySelector('.modal-inquiry').href='inquiry.html?'+(false ? 'lang=en&':'')+'fabric='+encodeURIComponent(item.name);
    mobileInquiry.href=detail.querySelector('.modal-inquiry').href;
    const controls=gallery.querySelector('.gallery-controls');controls.replaceChildren();
    function view(index){photo.src=photos[index];photo.alt=item.name+' '+locale.alt+' '+(index+1);gallery.querySelector('.gallery-label').textContent=photos.length>1?locale.photos+'  '+String(index+1).padStart(2,'0')+' / '+String(photos.length).padStart(2,'0'):locale.one;controls.querySelectorAll('button').forEach((button,i)=>button.setAttribute('aria-pressed',String(i===index)));}
    if(photos.length>1)photos.forEach((_,i)=>{const button=document.createElement('button');button.type='button';button.textContent=String(i+1).padStart(2,'0');button.setAttribute('aria-label',locale.photos+' '+(i+1));button.addEventListener('click',()=>view(i));controls.append(button);});view(0);
    if(!dialog.open){dialog.showModal();document.body.classList.add('modal-open');}dialog.scrollTop=0;sheet.scrollTop=0;
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
