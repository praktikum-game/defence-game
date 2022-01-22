import { BaseGameObject } from '../BaseGameObject/BaseGameObject';
import { BaseGameObjectProps } from '../BaseGameObject/types';
import { Drawable } from '../interfaces';

export class FieldGridItem extends BaseGameObject implements Drawable {
  
  constructor(baseProps: BaseGameObjectProps) {
    super(baseProps);
  }

  draw() {
    // console.log('before clear');
    // context.clearRect(this.x, this.y, this.width, this.height);
    // console.log('after clear');

    this._ctx.strokeStyle = 'white';
    this._ctx.strokeRect(this.x, this.y, this.width, this.height);
  }
}
