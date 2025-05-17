
export const initialColmados = [
  { id: 'colmado001', name: 'Colmado Don Juan', owner: 'Juan Perez', rnc: '101000001', address: 'Calle Falsa 123, Santo Domingo', phone: '809-555-1234', email: 'donjuan@colmado.com', status: 'Activo', creation_date: '2023-01-15', credit_limit_global: 50000, balance_global: 15000, contact_person: 'Juan Perez' },
  { id: 'colmado002', name: 'Super Colmado La Esquina', owner: 'Maria Rodriguez', rnc: '101000002', address: 'Avenida Luperón 45, Santo Domingo', phone: '809-555-5678', email: 'laesquina@colmado.com', status: 'Activo', creation_date: '2023-02-20', credit_limit_global: 75000, balance_global: 30000, contact_person: 'Maria Rodriguez' },
  { id: 'colmado003', name: 'Colmado El Vecino Feliz', owner: 'Carlos Gomez', rnc: '101000003', address: 'Calle Central 789, Santiago', phone: '829-555-9012', email: 'elvecinofeliz@colmado.com', status: 'Inactivo', creation_date: '2023-03-10', credit_limit_global: 30000, balance_global: 5000, contact_person: 'Carlos Gomez' },
];

export const initialCreditsData = [
  { id: 'cred001', client_id: 'clientUser001', client_name: 'Ana García', client_cedula: '001-1234567-1', amount: 5000, remaining_amount: 2500, interest_rate: 5, payment_frequency: 'Quincenal', next_payment_date: '2025-05-20', status: 'Activo', colmado_id: 'colmado001', colmado_name: 'Colmado Don Juan', request_date: '2025-04-01', approval_date: '2025-04-02', type: 'colmado' },
  { id: 'cred002', client_id: 'clientUser002_placeholder', client_name: 'Luis Jiménez', client_cedula: '001-7654321-2', amount: 10000, remaining_amount: 10000, interest_rate: 4, payment_frequency: 'Mensual', next_payment_date: '2025-06-01', status: 'Activo', colmado_id: 'colmado002', colmado_name: 'Super Colmado La Esquina', request_date: '2025-04-10', approval_date: '2025-04-11', type: 'colmado' },
  { id: 'cred003', client_id: 'clientUser003_placeholder', client_name: 'Sofia Castillo', client_cedula: '002-1122334-3', amount: 3000, remaining_amount: 0, interest_rate: 6, payment_frequency: 'Semanal', next_payment_date: null, status: 'Pagado', colmado_id: 'colmado001', colmado_name: 'Colmado Don Juan', request_date: '2025-03-15', approval_date: '2025-03-16', type: 'colmado' },
  { id: 'cred004', client_id: 'clientUser004_placeholder', client_name: 'Pedro Vargas', client_cedula: '003-2233445-4', amount: 7500, remaining_amount: 7500, interest_rate: 0, payment_frequency: 'Único', next_payment_date: '2025-07-15', status: 'Pendiente Aprobación', colmado_id: 'colmado003', colmado_name: 'Colmado El Vecino Feliz', request_date: '2025-05-01', approval_date: null, type: 'colmado' },
];

export const initialConsumptionsData = [
  { id: 'cons001', credit_id: 'cred001', client_id: 'clientUser001', client_name: 'Ana García', amount: 1000, date: '2025-04-05T00:00:00Z', description: 'Compra inicial de colmado', colmado_id: 'colmado001' },
  { id: 'cons002', credit_id: 'cred001', client_id: 'clientUser001', client_name: 'Ana García', amount: 1500, date: '2025-04-10T00:00:00Z', description: 'Compra adicional de bebidas', colmado_id: 'colmado001' },
  { id: 'cons003', credit_id: 'cred003', client_id: 'clientUser003_placeholder', client_name: 'Sofia Castillo', amount: 3000, date: '2025-03-20T00:00:00Z', description: 'Compra única de provisiones', colmado_id: 'colmado001' },
  { id: 'cons004', credit_id: 'cred002', client_id: 'clientUser002_placeholder', client_name: 'Luis Jiménez', amount: 500, date: '2025-05-02T00:00:00Z', description: 'Picadera fin de semana', colmado_id: 'colmado002' },
];

export const initialUsersData = [
  { id: 'admin001', name: 'Administrador Principal', email: 'admin@example.com', role: 'admin', auth_user_id: 'auth_admin_placeholder' },
  { id: 'colmadoUser001', name: 'Juan Perez (Colmado Don Juan)', email: 'juan.perez@colmado.com', role: 'colmado', colmado_id: 'colmado001', auth_user_id: 'auth_colmado001_placeholder' },
  { id: 'colmadoUser002', name: 'Maria Rodriguez (Super Colmado La Esquina)', email: 'maria.rodriguez@colmado.com', role: 'colmado', colmado_id: 'colmado002', auth_user_id: 'auth_colmado002_placeholder' },
  { id: 'clientUser001', name: 'Ana García (Cliente)', email: 'ana.garcia@cliente.com', role: 'cliente', associated_credit_id: 'cred001', auth_user_id: 'auth_client001_placeholder' }
];
