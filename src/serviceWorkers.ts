this.addEventListener('install', (event: Event) => {
  console.log(event);
  console.log('install');
});

this.addEventListener('activate', (event: Event) => {
  console.log(event);
  console.log('activate');
});
