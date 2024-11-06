document.querySelector(".radio").addEventListener("click", (e) => {
  if(e.target.value === 'metric') {
    document.getElementById('metric').classList.remove('hide');
    document.getElementById('imperial').classList.add('hide');
  } else if(e.target.value === 'imperial') {
    document.getElementById('metric').classList.add('hide');
    document.getElementById('imperial').classList.remove('hide');
  } else {
    return;
  }
});
