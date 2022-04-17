import Button from "components/Button"
import Card from "components/Card"
import MemberTable from "./MemberTable"

const SystemSettings = () => {
	return (
		<>
			<Card>
				<Card.Header title="案例列表">
					<Button variant="secondary">新增</Button>
				</Card.Header>
				<Card.Body>
					<MemberTable />
				</Card.Body>
			</Card>
		</>
	)
}

export default SystemSettings