const ActionTypes = {
    /*
        App
    */
    // 打开错误提示框
    SHOW_ERROR_MODAL: 'SHOW_ERROR_MODAL',
    // 关闭错误提示框
    CLOSE_ERROR_MODAL: 'CLOSE_ERROR_MODAL',
    // 打开初始对话框
    SELECT_RS_DIRECTORY: 'SELECT_RS_DIRECTORY',
    // 打开系统对话框选择 RS 目录
    OPEN_DIRECTORY_DIALOG: 'OPEN_DIRECTORY_DIALOG',
    // 目录对话框提示错误
    SET_DIRECTORY_DIALOG_ERROR: 'SET_DIRECTORY_DIALOG_ERROR',
    // 关闭目录对话框
    CLOSE_DIRECTORY_DIALOG: 'CLOSE_DIRECTORY_DIALOG',
    /*
        Config
    */
    // 从 Remote 更新本地 Store
    UPDATE_ALL_RS_CONFIG: 'UPDATE_ALL_RS_CONFIG',
    // 从 View 更新本地 Store
    UPDATE_RS_CONFIG: 'UPDATE_RS_CONFIG',
    // 将 Store 数据存储至 RS 中
    SAVE_RS_CONFIG: 'SAVE_RS_CONFIG',
    // 撤销本地 Store 的修改
    RESTORE_RS_CONFIG: 'RESTORE_RS_CONFIG',
    // 启动 Render Server
    LUNCH_RS: 'LUNCH_RS',
    // 重新启动 Render Server
    RESTART_RS: 'RESTART_RS',
    // 终止 Render Server 运行
    STOP_RS: 'STOP_RS',
    // Render的运行状态发生了变化
    UPDATE_RENDER_STATE: 'UPDATE_RENDER_STATE',
    // 关闭启动错误提示框
    CLOSE_LUNCH_ERROR_DIALOG: 'CLOSE_LUNCH_ERROR_DIALOG',
    /*
        Template
    */
    GET_TEMPLATES: 'GET_TEMPLATES',
    UPDATE_CHECK_FIELD: 'UPDATE_CHECK_FIELD',
    UPDATE_PAGINATION: 'UPDATE_PAGINATION',
    UPDATE_KEYWORD: 'UPDATE_KEYWORD',
    UPDATE_SELECTED_STYLE: 'UPDATE_SELECTED_STYLE' 
};

export default ActionTypes;