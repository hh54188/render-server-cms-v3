const ActionTypes = {
    /*
        App
    */
    // 打开错误提示框
    SHOW_ERROR_MODAL: 'SHOW_ERROR_MODAL',
    // 关闭错误提示框
    CLOSE_ERROR_MODAL: 'CLOSE_ERROR_MODAL',
    /*
        Config
    */
    // 更新本地 Store
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
    STOP_RS: 'STOP_RS'
    
};

export default ActionTypes;