import { Box, Button, Table, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';


const TaskListCard = ({ taskList }) => {
    return (
      <Box borderWidth="1px" borderRadius="md" p={4} mb={4}>
        <Text as="h2" fontSize="xl" mb={4}>
          Task List
        </Text>
        {/* <Button>View Task</Button> */}
        <Table variant="striped" mt={4}>
          <Thead>
            <Tr>
              <Th>Task Name</Th>
              <Th>Special Information</Th>
              <Th>Due Date</Th>
            </Tr>
          </Thead>
          <Tbody>
            {taskList.map((task) => (
              <Tr key={task.task_id}>
                <Td>{task.taskname}</Td>
                <Td>{task.specialinformation}</Td>
                <Td>{task.duedate}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    );
  };
  
export default TaskListCard;