import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm'

@Entity('Block')
@Unique(['contractAddress', 'chain'])
export class Block {
  @PrimaryGeneratedColumn()
    id: number

  @Column()
    lastBlock: number

  @Column()
    contractAddress: string

  @Column()
    chain: string
}
