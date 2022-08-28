
window.onscroll = function()
{
    var ScrollPosition = window.pageYOffset;
      if(ScrollPosition > 5)
    {
      document.getElementById("Head").style.backgroundColor = '#fff';
      document.getElementById("Nav").style.color = '#000';
      document.getElementById("Nav1").style.color = '#000';
      document.getElementById("Nav2").style.color = '#000';
      document.getElementById("Nav3").style.color = '#000';
      document.getElementById("Nav4").style.color = '#000';
    }
    else
    {
      document.getElementById("Head").style.backgroundColor = "";
      document.getElementById("Nav1").style.color = '#fff';
      document.getElementById("Nav2").style.color = '#fff';
      document.getElementById("Nav3").style.color = '#fff';
      document.getElementById("Nav").style.color = '#fff';
      document.getElementById("Nav4").style.color = '#fff';
    }
}


  