
export const Table = ({ headers, data, actions }) => {

    const renderTableHeader = () => {
        return headers.map((header, index) => (
            <th key={index} scope="col" className="px-6 py-3">{header}</th>
        ));
    };

    const renderTableData = (dato) => {
        return Object.keys(dato).map(key => (
            <td key={key} className="px-6 py-4 whitespace-nowrap">
                {dato[key]}
            </td>
        ))
    };

    const renderTableActions = (dato) => {
        return actions.map((action, index) => (
            <button
                key={index}
                className={`bg-${action.color} hover:bg-${action.colorHover} text-white font-bold py-2 px-4 rounded mr-4`}
                onClick={() => action.onClick(dato)}
            >
                <i className={`${action.icon} mr-2`} />
                {action.text}
            </button>
        ));
    };

    // renderTableData();

    return (
        <table className="bg-bg-300 w-full col-span-5 text-sm text-center rtl:text-right text-text200 ">
            <thead className="bg-bg200 text-xs text-text100 uppercase">
                <tr>
                    {renderTableHeader()}
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-bg-300">
                {data.map((dato) => (
                    <tr key={dato.id}>
                        { renderTableData(dato) }

                        <td className="px-6 py-4 whitespace-nowrap">
                            { actions && renderTableActions(dato) }
                            {/* <button
                                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mr-4"
                                // onClick={() => handleAceptar(solicitud.ID)}
                            >
                                <i className="fa-solid fa-check mr-2" />
                                Aceptar
                            </button>
                            <button
                                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                                // onClick={() => handleRechazar(solicitud.ID)}
                            >
                                <i className="fa-solid fa-trash mr-2" />
                                Eliminar
                            </button> */}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
