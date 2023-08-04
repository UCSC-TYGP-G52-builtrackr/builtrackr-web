import { Box, Button, Grid, Table, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { BsChatDots } from 'react-icons/bs';
import { useStateContext } from '../../contexts/ContextProvider';
import { Edit2} from 'react-feather';

  const TaskListCard = () => {
const { setCurrentColor, setCurrentMode, currentMode, activeMenu, themeSettings, setThemeSettings } = useStateContext();
    return (
        <>
        <div className="relative flex dark:bg-main-dark-bg w:80">
        {/* chatbot popup */}
        <div className="fixed right-4 bottom-4" style={{ zIndex: '1000' }}>
          <button
            type="button"
            onClick={() => setThemeSettings(true)}
            style={{ backgroundColor: 'yellow-400', borderRadius: '50%' }}
            className="p-3 text-3xl text-white bg-yellow-400 hover:drop-shadow-xl"
          >
            <BsChatDots />
          </button>
        </div>

        {activeMenu ? (
          <div className="fixed bg-white w-72 sidebar dark:bg-secondary-dark-bg ">
            <Sidebar />
          </div>
        ) : (
          <div className="w-0 dark:bg-secondary-dark-bg">
            <Sidebar />
          </div>
        )}
        </div>
        <div className="fixed w:70% md:static bg-main-bg dark:bg-main-dark-bg navbar ">
        <Navbar />
      </div>

      <div
        className={
          activeMenu
            ? 'dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-fit  '
            : 'bg-main-bg dark:bg-main-dark-bg  w-fit  min-h-screen flex-2 '
        }
      >

        <div style={{ display: 'flex', justifyContent: 'flex-end' , margin:'10px' }}>
        <Button
          style={{ backgroundColor: '#ffcc00',border: 'none',color: 'black',padding: '10px 20px',
          fontSize: '16px',borderRadius: '4px',boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',cursor: 'pointer',
          transition: 'background-color 0.3s, box-shadow 0.3s',
        }}>
          Add Equipment
        </Button>
      </div>
        <Grid templateColumns="repeat(auto-fit, minmax(1150px, 1fr))" gap={10} >

            <Box key={1} borderWidth="1px" borderRadius="md" p={10} >
              <Table variant="striped"  colorScheme='teal' ml='160' >
                <Thead>
                  <Tr>
                    <Th px={50}>Equipment Name</Th>
                    <Th px={50}> Status</Th>
                    <Th px={50}>Note</Th>
                    <Th px={50}>Action</Th>
                  </Tr>
                </Thead>
                <Tbody  spacing = "100px">
                  <Tr>
                    <Td px={50}>BT2132534</Td>
                    <Td px={50}>Available</Td>
                    <Td px={50}>Good Condition</Td>
                    <Td px={50}> <Button mt={4} style={{ backgroundColor: '#ffcc00',border: 'none',color: 'black',padding: '5px 10px',
          fontSize: '16px',borderRadius: '4px',boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',cursor: 'pointer',
          transition: 'background-color 0.3s, box-shadow 0.3s',
        }}><Edit2 /></Button></Td>
                  </Tr>
                  <Tr>
                    <Td px={50}>BT2135634</Td>
                    <Td px={50}> Not Available</Td>
                    <Td px={50}>Good Condition</Td>
                    <Td px={50}> <Button mt={4} style={{ backgroundColor: '#ffcc00',border: 'none',color: 'black',padding: '5px 10px',
          fontSize: '16px',borderRadius: '4px',boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',cursor: 'pointer',
          transition: 'background-color 0.3s, box-shadow 0.3s',
           }}><Edit2 />
           </Button>
           </Td>
          </Tr>
          <Tr>
                    <Td px={50}>BT2135634</Td>
                    <Td px={50}> Not Available</Td>
                    <Td px={50}> Damaged</Td>
                    <Td px={50}> <Button mt={4} style={{ backgroundColor: '#ffcc00',border: 'none',color: 'black',padding: '5px 10px',
          fontSize: '16px',borderRadius: '4px',boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',cursor: 'pointer',
          transition: 'background-color 0.3s, box-shadow 0.3s',
           }}><Edit2 /></Button></Td>
           </Tr>

                </Tbody>
              </Table>
            </Box>

        </Grid>
    </div>
      </>
    );
  };

  export default TaskListCard;