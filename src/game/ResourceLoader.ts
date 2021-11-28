// import doctor from './assets/doctor_image.jpg';
// import nurse from './assets/nurse_image.png';
// import bullet from './assets/pills.jpg';
// import syringe from './assets/syringe.png';
// import virus from './assets/corona_red.png';

// import { BaseBullet } from './Bullets/BaseBullet';
// import { BaseDefender } from './Defenders/BaseDefender';
// import { setImage } from './helpers';
// import { BaseEnemy } from './Enemies/BaseEnemy';

// export class ResourceLoader {
//   public static init() {
//     Promise.all([
//       setImage(doctor, {}),
//       setImage(nurse, {}),
//       setImage(bullet, {}),
//       setImage(syringe, {}),
//       setImage(virus, {}),
//     ]).then((imgResources) => {
//       const [doctorImg, bulletImg, virusImg] = imgResources;
//       BaseDefender.image = doctorImg;
//       BaseBullet.image = bulletImg;
//       BaseEnemy.image = virusImg;
//     });
//   }
// }
