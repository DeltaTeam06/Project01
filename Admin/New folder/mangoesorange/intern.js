function check(){
    var input=document.getElementById('fname');
    // var input=document.getElementsById('fcourse');
    if(input.value !== " "){
        ecertificate();

    }
    else{
        alert("input field empty");
    }
    
    
}
function ecertificate(){
    var x= document.getElementById("main");
    x.style.display="block";
    var cname=document.getElementById("fname").value;
    var courses=document.getElementById("fcourse").value;
    document.getElementsByTagName('B')[0].innerHTML=cname;
    document.getElementsByTagName('h3')[0].innerHTML=courses;
}
function getdrt(){
    document.getElementById('cstime').innerHTML=("Duration :<strong>"+ dtmc.ctime[dtmc.ctime.selectedIndex].text+"</strong>");
}


