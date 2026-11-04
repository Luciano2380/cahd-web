import { SideNavItems, SideNavSection } from '@layout/models';

export const sideNavSections: SideNavSection[] = [
    {
        text: 'Menu',
        items: ['pages', 'report','operational','service'],
    }  
];

export const sideNavItems: SideNavItems = {
    pages: {
        icon: 'book-open',
        text: 'Cadastros',
        submenu: [
            {
               
                text: 'Clientes',
                link: '/client/client-search',
              
            },
            {
               
                text: 'Serviços',
                link: '/service/service-search',
              
            },
            {
               
                text: 'Complementos',
                link: '/service-type/service-type-search',
              
            },
            {
               
                text: 'Compras',
                link: '/purchase/purchase-search',
              
            },
            {
               
                text: 'Cor',
                link: '/color/color-search',
              
            },
            {
               
                text: 'Veiculo',
                link: '/vehicle/vehicle-search',
              
            } 
                   
        ],
    },   
    report: {
        icon: 'user',
        text: 'Administrativo',
        submenu: [
            {
               
                text: 'Relatório de Compras',
                link: '/purchase/purchase-report',
              
            },
            {
               
                text: 'Relatório de Serviços Executados',
                link: '/service-performed/service-performed-report',
              
            },
            {
               
                text: 'Cadastro de Empresas',
                link: '/company/company-search',
              
            },
            {
               
                text: 'Cadastro de Usuários',
                link: '/auth/forgot-password',
              
            }     
        ]
    },
    operational: {
        icon: 'table',
        text: 'Operacional',
        submenu: [
            {
               
                text: 'Executar Serviço',
                link: '/service-performed/show-service-performed',
              
            },
            {
               
                text: 'Serviços Executados',
                link: '/service-performed/service-performed-search',
              
            },
            {
               
                text: 'Valores dos Complementos',
                link: '/service-type/show-service-type',
              
            }
            
        ]
    },
    service: {
        icon: 'book-open',
        text: 'Executar Serviço',
        link: '/service-performed/show-service-performed',        
    },
};
