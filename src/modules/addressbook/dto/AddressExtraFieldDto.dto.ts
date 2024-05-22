import { IsString } from 'class-validator';

export class AddressExtraFieldDto {
  @IsString()
  fieldName: string;

  @IsString()
  fieldValue: string;
}