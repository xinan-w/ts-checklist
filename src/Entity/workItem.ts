import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity()
export class WorkItem {
    @PrimaryGeneratedColumn()
    public id: number = 1;

    @Column({length: 100})
    public text: string = '所有';

    @Column({default: false})
    public isChecked: boolean = true;

    @CreateDateColumn({default: false})
    public createdAt: string = '';

    @UpdateDateColumn({default: false})
    public updatedAt: string = '';
}
