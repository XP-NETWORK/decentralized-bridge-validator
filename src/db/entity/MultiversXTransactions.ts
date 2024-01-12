import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity('MultiversXTransactions')
export class MultiversXTransactions {
  @PrimaryGeneratedColumn()
    id: number

  @Column({ unique: true })
    transactionHash: string

  @Column()
    status: string
}
