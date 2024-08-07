const I = document.querySelector('#fname');
const h1 = document.querySelector('.n');
I.addEventListener('input', function(e){
    const v = I.value;
    h1.innerText = `Dear ${v},`;
    if(v==='')
    h1.innerText="Dear";
});