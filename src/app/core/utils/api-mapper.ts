/**
 * The backend exposes Portuguese JSON keys; the application models use English names.
 * This mapper translates keys in both directions so the API contract is unchanged.
 * Keys that are identical in both languages (id, email, cnpj, cpfCnpj, menu, contents...) are not listed.
 */
const PT_TO_EN: { [key: string]: string } = {
    nome: 'name',
    sexo: 'gender',
    telefone: 'phone',
    tipoPessoa: 'personType',
    ativo: 'active',
    dataCriacao: 'createdAt',
    dataAlteracao: 'updatedAt',
    clientesVeiculos: 'clientVehicles',
    placa: 'licensePlate',
    veiculo: 'vehicle',
    cor: 'color',
    cliente: 'client',
    endereco: 'address',
    bairro: 'neighborhood',
    cidade: 'city',
    estado: 'state',
    numero: 'number',
    complemento: 'complement',
    cep: 'zipCode',
    celular: 'mobile',
    padrao: 'isDefault',
    local: 'place',
    valor: 'value',
    descricao: 'description',
    linkImagem: 'imageLink',
    dataCompra: 'purchaseDate',
    exibirCliente: 'showClient',
    tipoServicoDinamico: 'dynamicServiceType',
    tiposServicos: 'serviceTypes',
    servicoExecutado: 'servicePerformance',
    preco: 'price',
    registro: 'record',
    servico: 'service',
    precoTotal: 'totalPrice',
    dataHoraPrevisao: 'expectedDateTime',
    impresso: 'printed',
    excluido: 'deleted',
    tiposServicosPrecos: 'serviceTypePrices',
    tiposServicosDinamicos: 'dynamicServiceTypes',
    nomeCliente: 'clientName',
    telefoneCliente: 'clientPhone',
    placaCliente: 'clientLicensePlate',
    observacao: 'note',
    tamanho: 'size',
    nomeTamanho: 'sizeName',
    nomeTipoServico: 'serviceTypeName',
    precos: 'prices',
    linkFoto: 'photoLink',
    perfil: 'profile',
    senha: 'password',
    totalRegistros: 'totalRecords',
    totalPaginas: 'totalPages',
    numeroPagina: 'pageNumber',
    ultimaPagina: 'lastPage',
    proximaPagina: 'nextPage',
};

const EN_TO_PT: { [key: string]: string } = Object.keys(PT_TO_EN).reduce(
    (acc: { [key: string]: string }, pt) => {
        acc[PT_TO_EN[pt]] = pt;
        return acc;
    },
    {}
);

function isPlainObject(value: any): boolean {
    return value !== null && typeof value === 'object' && Object.getPrototypeOf(value) === Object.prototype;
}

function mapKeys(value: any, dictionary: { [key: string]: string }): any {
    if (Array.isArray(value)) {
        return value.map(item => mapKeys(item, dictionary));
    }
    if (isPlainObject(value)) {
        const result: { [key: string]: any } = {};
        Object.keys(value).forEach(key => {
            result[dictionary[key] || key] = mapKeys(value[key], dictionary);
        });
        return result;
    }
    return value;
}

export class ApiMapper {
    /** Backend (Portuguese keys) -> application (English keys). */
    static fromApi<T = any>(value: any): T {
        return mapKeys(value, PT_TO_EN);
    }

    /** Application (English keys) -> backend (Portuguese keys). Not safe for circular structures. */
    static toApi<T = any>(value: any): T {
        return mapKeys(value, EN_TO_PT);
    }

    /** Translates only the own keys of a plain object (children untouched), for use in a JSON.stringify replacer. */
    static toApiShallow(value: any): any {
        if (!isPlainObject(value)) {
            return value;
        }
        const result: { [key: string]: any } = {};
        Object.keys(value).forEach(key => {
            result[EN_TO_PT[key] || key] = value[key];
        });
        return result;
    }
}
