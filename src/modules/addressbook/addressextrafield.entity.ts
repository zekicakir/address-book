import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

import { AddressBook } from './addressbook.entity';

@Entity("addressextrafield")
export class AddressExtraField {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  addressid: number;

  @Column()
  key: string;

  @Column()
  value: string; 
  @ManyToOne(() => AddressBook)
  @JoinColumn({ name: 'addressid' })
  address: AddressBook;
}
