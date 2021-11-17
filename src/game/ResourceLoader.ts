import doctor from './assets/doctor.jpg';
import bullet from './assets/pills.jpg';
import virus from './assets/corona_red.png';

import { BaseBullet } from './BaseBullet';
import { BaseDefender } from './BaseDefender';
import { setImage } from './helpers';
import { BaseEnemy } from './BaseEnemy';

export class ResourceLoader {
  public static init() {
    Promise.all([setImage(doctor), setImage(bullet), setImage(virus)])
      .then((imgResources) => {
        const [doctorImg, bulletImg, virusImg] = imgResources;
        BaseDefender.image = doctorImg;
        BaseBullet.image = bulletImg;
        BaseEnemy.image = virusImg;
      })
      .then((img) => img);
  }
}
