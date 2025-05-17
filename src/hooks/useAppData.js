
import { useState, useEffect, useCallback } from 'react';
import { useToast } from "@/components/ui/use-toast";

const initialColmados = [
  { id: 'colmado001', name: 'Colmado Don Juan', owner: 'Juan Perez', rnc: '101000001', address: 'Calle Falsa 123, Santo Domingo', phone: '809-555-1234', email: 'donjuan@colmado.com', status: 'Activo', creationDate: '2023-01-15', creditLimitGlobal: 50000, balanceGlobal: 15000, contactPerson: 'Juan Perez' },
  { id: 'colmado002', name: 'Super Colmado La Esquina', owner: 'Maria Rodriguez', rnc: '101000002', address: 'Avenida Luperón 45, Santo Domingo', phone: '809-555-5678', email: 'laesquina@colmado.com', status: 'Activo', creationDate: '2023-02-20', creditLimitGlobal: 75000, balanceGlobal: 30000, contactPerson: 'Maria Rodriguez' },
  { id: 'colmado003', name: 'Colmado El Vecino Feliz', owner: 'Carlos Gomez', rnc: '101000003', address: 'Calle Central 789, Santiago', phone: '829-555-9012', email: 'elvecinofeliz@colmado.com', status: 'Inactivo', creationDate: '2023-03-10', creditLimitGlobal: 30000, balanceGlobal: 5000, contactPerson: 'Carlos Gomez' },
];

const initialCreditsData = [
  { id: 'cred001', clientId: 'client001', clientName: 'Ana García', clientCedula: '001-1234567-1', amount: 5000, remainingAmount: 2500, interestRate: 5, paymentFrequency: 'Quincenal', nextPaymentDate: '2025-05-20', status: 'Activo', colmadoId: 'colmado001', colmadoName: 'Colmado Don Juan', requestDate: '2025-04-01', approvalDate: '2025-04-02', consumptionHistory: [{date: '2025-04-05', amount: 1000, description: 'Compra inicial'}, {date: '2025-04-10', amount: 1500, description: 'Compra adicional'}], paymentHistory: [{date: '2025-04-15', amount: 2500, type: 'Abono'}], type: 'colmado' },
  { id: 'cred002', clientId: 'client002', clientName: 'Luis Jiménez', clientCedula: '001-7654321-2', amount: 10000, remainingAmount: 10000, interestRate: 4, paymentFrequency: 'Mensual', nextPaymentDate: '2025-06-01', status: 'Activo', colmadoId: 'colmado002', colmadoName: 'Super Colmado La Esquina', requestDate: '2025-04-10', approvalDate: '2025-04-11', consumptionHistory: [], paymentHistory: [], type: 'colmado' },
  { id: 'cred003', clientId: 'client003', clientName: 'Sofia Castillo', clientCedula: '002-1122334-3', amount: 3000, remainingAmount: 0, interestRate: 6, paymentFrequency: 'Semanal', nextPaymentDate: null, status: 'Pagado', colmadoId: 'colmado001', colmadoName: 'Colmado Don Juan', requestDate: '2025-03-15', approvalDate: '2025-03-16', consumptionHistory: [{date: '2025-03-20', amount: 3000, description: 'Compra única'}], paymentHistory: [{date: '2025-03-27', amount: 3000, type: 'Pago Total'}], type: 'colmado' },
  { id: 'cred004', clientId: 'client004', clientName: 'Pedro Vargas', clientCedula: '003-2233445-4', amount: 7500, remainingAmount: 7500, interestRate: 0, paymentFrequency: 'Único', nextPaymentDate: '2025-07-15', status: 'Pendiente Aprobación', colmadoId: 'colmado003', colmadoName: 'Colmado El Vecino Feliz', requestDate: '2025-05-01', approvalDate: null, consumptionHistory: [], paymentHistory: [], type: 'colmado' },
];

const initialConsumptionsData = [
  { id: 'cons001', creditId: 'cred001', clientId: 'client001', clientName: 'Ana García', amount: 1000, date: '2025-04-05', description: 'Compra inicial de colmado', colmadoId: 'colmado001' },
  { id: 'cons002', creditId: 'cred001', clientId: 'client001', clientName: 'Ana García', amount: 1500, date: '2025-04-10', description: 'Compra adicional de bebidas', colmadoId: 'colmado001' },
  { id: 'cons003', creditId: 'cred003', clientId: 'client003', clientName: 'Sofia Castillo', amount: 3000, date: '2025-03-20', description: 'Compra única de provisiones', colmadoId: 'colmado001' },
  { id: 'cons004', creditId: 'cred002', clientId: 'client002', clientName: 'Luis Jiménez', amount: 500, date: '2025-05-02', description: 'Picadera fin de semana', colmadoId: 'colmado002' },
];

const initialUsersData = [
  { id: 'admin001', name: 'Administrador Principal', email: 'admin@example.com', password: 'password', role: 'admin' },
  { id: 'colmadoUser001', name: 'Juan Perez (Colmado Don Juan)', email: 'juan.perez@colmado.com', password: 'password123', role: 'colmado', colmadoId: 'colmado001' },
  { id: 'colmadoUser002', name: 'Maria Rodriguez (Super Colmado La Esquina)', email: 'maria.rodriguez@colmado.com', password: 'password123', role: 'colmado', colmadoId: 'colmado002' },
  { id: 'clientUser001', name: 'Ana García (Cliente)', email: 'ana.garcia@cliente.com', password: 'clientpassword', role: 'cliente', associatedCreditId: 'cred001' }
];


const loadFromLocalStorage = (key, defaultValue) => {
  try {
    const storedValue = localStorage.getItem(key);
    if (storedValue) {
      return JSON.parse(storedValue);
    }
  } catch (error) {
    console.error(`Error parsing ${key} from localStorage:`, error);
  }
  return defaultValue;
};

const saveToLocalStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error saving ${key} to localStorage:`, error);
  }
};


export const useAppData = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [credits, setCredits] = useState([]);
  const [consumptions, setConsumptions] = useState([]);
  const [colmadosData, setColmadosData] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    setCurrentUser(loadFromLocalStorage("currentUser", null));
    setCredits(loadFromLocalStorage("credits", initialCreditsData));
    setConsumptions(loadFromLocalStorage("consumptions", initialConsumptionsData));
    setColmadosData(loadFromLocalStorage("colmados", initialColmados));
    setUsers(loadFromLocalStorage("users", initialUsersData));
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!loading) saveToLocalStorage("currentUser", currentUser);
  }, [currentUser, loading]);

  useEffect(() => {
    if (!loading) saveToLocalStorage("credits", credits);
  }, [credits, loading]);

  useEffect(() => {
    if (!loading) saveToLocalStorage("consumptions", consumptions);
  }, [consumptions, loading]);

  useEffect(() => {
    if (!loading) saveToLocalStorage("colmados", colmadosData);
  }, [colmadosData, loading]);
  
  useEffect(() => {
    if (!loading) saveToLocalStorage("users", users);
  }, [users, loading]);

  const handleLogin = useCallback((user) => {
    setCurrentUser(user);
  }, []);

  const handleLogout = useCallback(() => {
    setCurrentUser(null);
  }, []);
  
  const updateCredits = useCallback((updatedCredit) => {
    setCredits(prevCredits => {
      const newCredits = prevCredits.map(c => c.id === updatedCredit.id ? updatedCredit : c);
      return newCredits;
    });
  }, []);

  const addCredit = useCallback((newCredit) => {
    setCredits(prevCredits => {
      const newCredits = [...prevCredits, newCredit];
      return newCredits;
    });
  }, []);

  const addConsumption = useCallback((newConsumption) => {
    setConsumptions(prevConsumptions => {
      const newConsumptions = [...prevConsumptions, newConsumption];
      return newConsumptions;
    });
    
    setCredits(prevCredits => {
      const newCredits = prevCredits.map(credit => {
        if (credit.id === newConsumption.creditId) {
          const updatedConsumptionHistory = [...(credit.consumptionHistory || []), {
            date: newConsumption.date,
            amount: newConsumption.amount,
            description: newConsumption.description
          }];
          return {
            ...credit,
            remainingAmount: Math.max(0, (credit.remainingAmount || 0) - newConsumption.amount),
            consumptionHistory: updatedConsumptionHistory
          };
        }
        return credit;
      });
      return newCredits;
    });
  }, []);

  const updateColmados = useCallback((updatedColmadosArray) => {
    setColmadosData(updatedColmadosArray);
  }, []);


  const addUser = useCallback((newUser) => {
    setUsers(prevUsers => {
      const newUsers = [...prevUsers, newUser];
      return newUsers;
    });
  }, []);

  const updateUser = useCallback((userId, updatedData) => {
    setUsers(prevUsers => {
      const newUsers = prevUsers.map(u => u.id === userId ? {...u, ...updatedData} : u);
      return newUsers;
    });
  }, []);

  const deleteUser = useCallback((userId) => {
    setUsers(prevUsers => {
      const newUsers = prevUsers.filter(u => u.id !== userId);
      return newUsers;
    });
  }, []);


  return {
    currentUser,
    credits,
    consumptions,
    colmadosData,
    users,
    loading,
    handleLogin,
    handleLogout,
    updateCredits,
    addCredit,
    addConsumption,
    updateColmados,
    addUser,
    updateUser,
    deleteUser,
  };
};
