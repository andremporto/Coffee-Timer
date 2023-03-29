import { FormContainer, MinutesAmountInput, TaskInput } from './styles';
import * as zod from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

const newCycleFormValidationSchema = zod.object({
	task: zod.string().min(1, 'Informe a atividade'),
	owner: zod.string().optional(),
	minutesAmount: zod
		.number()
		.min(5, 'O tempo mínimo é de 5 minutos.')
		.max(60, 'O tempo máximo é de 60 minutos.'),
});

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>;

export function NewCycleForm() {
	const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
		resolver: zodResolver(newCycleFormValidationSchema),
		defaultValues: {
			task: '',
			minutesAmount: 0,
		},
	});

	return (
		<FormContainer>
			<label htmlFor="task">Vou focar em</label>
			<TaskInput
				id="task"
				list="task-suggestions"
				placeholder="Dê um nome à tarefa"
				disabled={!!activeCycle}
				{...register('task')}
			/>

			<datalist id="task-suggestions">
				<option value="Projeto 1" />
				<option value="Projeto 2" />
				<option value="Projeto 3" />
				<option value="Banana" />
			</datalist>

			<label htmlFor="minutesAmount">durante</label>
			<MinutesAmountInput
				type="number"
				id="minutesAmount"
				placeholder="00"
				step={5}
				min={5}
				max={60}
				disabled={!!activeCycle}
				{...register('minutesAmount', { valueAsNumber: true })}
			/>

			<span>minutos.</span>
		</FormContainer>
	);
}
