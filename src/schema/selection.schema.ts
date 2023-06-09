import { SelectionType } from '@/common/constant/enum';
import { Prop } from '@nestjs/mongoose';

export class Selection {
  @Prop({ type: String, enum: SelectionType, required: true })
  type: SelectionType;

  @Prop({ type: String, required: true })
  content: string;

  constructor(type: SelectionType, content: string) {
    this.type = type;
    this.content = content;
  }
}
