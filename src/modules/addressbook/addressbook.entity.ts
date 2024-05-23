import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
@Entity("addressbook")
export class AddressBook
 {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column()
  telephone: string;

  @Column()
  age: number;

  @Column()
  gender: string;
 
  @Column()
  city: string;
 
  @Column()
  userid: number;
}
