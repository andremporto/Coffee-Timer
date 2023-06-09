import { useContext } from "react";
import { formatDistanceToNow } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { CyclesContext } from "../../contexts/CyclesContext";
import { HistoryContainer, HistoryList, Status } from "./styles";
import { format, formatDistance, formatRelative, subDays } from "date-fns";

export function History() {
	const { cycles } = useContext(CyclesContext);

	return (
		<HistoryContainer>
			<h1>Histórico</h1>

			<HistoryList>
				<table>
					<thead>
						<tr>
							<th>Atividade</th>
							<th>Duração</th>
							<th>Início</th>
							<th>Status</th>
						</tr>
					</thead>
					<tbody>
						{cycles.map((cycle) => {
							return (
								<tr key={cycle.id}>
									<td>{cycle.task}</td>
									<td>{cycle.minutesAmount} minutos</td>
									<td>
										{formatDistanceToNow(cycle.startDate, {
											addSuffix: true,
											locale: ptBR,
										})}
										&rbrace;
									</td>
									<td>
										{cycle.finishedDate && (
											<Status statusColor="green">Concluído</Status>
										)}

										{cycle.interruptedDate && (
											<Status statusColor="red">Interrompido</Status>
										)}

										{!cycle.finishedDate && !cycle.interruptedDate && (
											<Status statusColor="yellow">Em curso</Status>
										)}
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</HistoryList>
		</HistoryContainer>
	);
}
