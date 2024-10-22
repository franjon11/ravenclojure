# DApp de Colaboraciones
Trabajo Práctico para la materia (75.31) Teoría de Lenguaje - Equipo: Ravenclojure - Lenguaje: Solidity

## Descripción

La DApp permite la creación de cuentas donde se puede recibir dinero hasta un monto máximo. Estas cuentas pueden ser utilizadas para:

- Hacer beneficencia
- Financiar un proyecto

## Funcionalidades

### Crear cuentas de financiación (Campañas)

Los usuarios pueden crear cuentas de financiación que reciben dinero en criptomonedas. Cada cuenta de financiación deberá cumplir con las siguientes condiciones:

- **Monto máximo objetivo:** Una vez alcanzado, no se permitirán más donaciones.
- **Plazo estipulado:** Se debe definir un tiempo límite para la campaña.

### Roles dentro de la DApp

La plataforma permitirá asignar roles específicos a los usuarios:

- **Beneficiarios:** Crean campañas y reciben fondos.
- **Colaboradores / Donantes:** Personas que aportan dinero en las campañas.

### Gestión de retiros de fondos

- Los beneficiarios podrán retirar fondos solo cuando la campaña alcance el monto objetivo dentro del plazo establecido.
- Si la campaña no llega al monto objetivo en el plazo estipulado, se reembolsarán los fondos a todos los colaboradores.

### Dashboard

La DApp contará con un **dashboard** donde los colaboradores podrán:

- Visualizar todas las campañas activas.
- Ver las campañas en las que han donado.

### Recompensas con Tokens

La plataforma premiará a los colaboradores con Tokens, basados en el porcentaje donado en cada campaña (donde cada percentil es un tier). Estos tokens se reflejarán en un **ranking de donantes**, visible en el dashboard.

