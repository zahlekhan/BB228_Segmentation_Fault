import React from 'react';
import { Table, Rating, TableBody } from 'semantic-ui-react';

const FeedbackCard = (ratings) => {
	return (
		<React.Fragment>
			<Table collapsing style={{margin:"auto"}}>
				<Table.Header>
					<Table.Row>
						<Table.HeaderCell singleLine>Parameters</Table.HeaderCell>
						<Table.HeaderCell>Rating</Table.HeaderCell>
					</Table.Row>
				</Table.Header>
				<TableBody>
					{ratings.ratings.map((rating) => {
						return (
							<Table.Row>
								<Table.Cell>{rating[0]}</Table.Cell>
								<Table.Cell>
									<Rating maxRating={5} defaultRating={rating[1]} icon='star' size='mini' disabled />
								</Table.Cell>
							</Table.Row>
						);
					})}
				</TableBody>
			</Table>
		</React.Fragment>
	);
};

export default FeedbackCard;
