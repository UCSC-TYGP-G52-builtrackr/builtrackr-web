import { Box, Button, Grid, Table,Modal,ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton, Tbody, Td, Text, Th, Thead, Tr, ModalFooter } from '@chakra-ui/react';
import { useState } from 'react';


const TaskListCard = ({ taskList }) => {

  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewTask = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };
const handleCloseModal = () => {
setIsModalOpen(false);
};
  return (
    <Box borderWidth="1px" borderRadius="md" p={4} mb={4}>
      <Text as="h2" fontSize="xl" mb={4}>
        Task List
      </Text>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <Button
        style={{ backgroundColor: '#ffcc00',border: 'none',color: 'black',padding: '10px 20px',
        fontSize: '16px',borderRadius: '4px',boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',cursor: 'pointer',
        transition: 'background-color 0.3s, box-shadow 0.3s',
      }}>
        Add Task
      </Button>
    </div>
      <Grid templateColumns="repeat(auto-fit, minmax(250px, 1fr))" gap={4}>
        {taskList.map((task) => (
          <Box key={task.task_id} borderWidth="1px" borderRadius="md" p={4}>
            <Table variant="striped" mt={4}>
              <Thead>
                <Tr>
                  <Th>Task Name</Th>
                  {/* <Th>Special Information</Th>
                  <Th>Due Date</Th> */}
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>{task.taskname}</Td>
                  {/* <Td>{task.specialinformation}</Td>
                  <Td>{task.duedate}</Td> */}
                </Tr>
              </Tbody>
            </Table>
            <Button mt={4} style={{ backgroundColor: '#ffcc00',border: 'none',color: 'black',padding: '10px 20px',
        fontSize: '16px',borderRadius: '4px',boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',cursor: 'pointer',
        transition: 'background-color 0.3s, box-shadow 0.3s',
      }} onClick={() => handleViewTask(task)}>View Task</Button>
          </Box>
        ))}
      </Grid>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Task Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedTask && (
              <Table variant="striped" mt={4}>
                <Thead>
                  <Tr>
                    <Th>Task Name</Th>
                    <Th>Special Information</Th>
                    <Th>Due Date</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>{selectedTask.taskname}</Td>
                    <Td>{selectedTask.specialinformation}</Td>
                    <Td>{selectedTask.duedate}</Td>
                  </Tr>

                </Tbody>
              </Table>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={handleCloseModal}>
              Delete 
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
 
    </Box>
  );
};

export default TaskListCard;
