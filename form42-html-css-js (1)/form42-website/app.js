const menuButton=document.querySelector('.menu-button');
const mobileNav=document.querySelector('.mobile-nav');
if(menuButton&&mobileNav){menuButton.addEventListener('click',()=>{const open=menuButton.classList.toggle('open');mobileNav.classList.toggle('open',open);menuButton.setAttribute('aria-expanded',String(open));});}
const params=new URLSearchParams(location.search);const race=params.get('race');const raceSelect=document.querySelector('#race');if(race&&raceSelect){raceSelect.value=race;}
function connectForm(formId,successId){const form=document.querySelector(formId);const success=document.querySelector(successId);if(!form||!success)return;form.addEventListener('submit',event=>{event.preventDefault();if(!form.reportValidity())return;form.hidden=true;success.hidden=false;success.scrollIntoView({behavior:'smooth',block:'center'});});success.querySelector('.reset-form')?.addEventListener('click',()=>{success.hidden=true;form.hidden=false;form.reset();form.scrollIntoView({behavior:'smooth',block:'center'});});}
connectForm('#registration-form','#registration-success');connectForm('#contact-form','#contact-success');
