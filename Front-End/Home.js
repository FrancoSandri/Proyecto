
window.onscroll = function()
{
  var ScrollPosition = window.pageYOffset;
  if(ScrollPosition > 5)
  {
    document.getElementById("Head").style.backgroundColor = '#fff';
  }
  else
  {
    document.getElementById("Head").style.backgroundColor = "";
  }

}

  