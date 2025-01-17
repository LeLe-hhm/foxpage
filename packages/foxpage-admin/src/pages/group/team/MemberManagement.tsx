import React, { useContext, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, message, Modal as AntdModal, Popconfirm, Select, Spin, Table } from 'antd';
import styled from 'styled-components';
import { RootState } from 'typesafe-actions';

import * as ACTIONS from '@/actions/group/team';
import { fetchOrganizationUsers } from '@/actions/group/user';
import GlobalContext from '@/pages/GlobalContext';
import { OrganizationUrlParams } from '@/types/index';
import periodFormat from '@/utils/period-format';

const { Option } = Select;
const PAGE_SIZE = 10000;

const Modal = styled(AntdModal)`
  .ant-modal-content {
    height: 100% !important;
    .ant-modal-body {
      overflow: auto !important;
      max-height: calc(100% - 55px) !important;
    }
  }
`;

const mapStateToProps = (store: RootState) => ({
  managementTeam: store.group.team.managementTeam,
  users: store.group.user.users,
  userManagementDrawerOpen: store.group.team.userManagementDrawerOpen,
  pageInfo: store.group.team.pageInfo,
  managementTeamLoading: store.group.team.managementTeamLoading,
});

const mapDispatchToProps = {
  updateUserManagementDrawerOpenStatus: ACTIONS.updateUserManagementDrawerOpenStatus,
  fetchOrganizationUsers: fetchOrganizationUsers,
  fetchTeamList: ACTIONS.fetchTeamList,
  deleteTeamUsers: ACTIONS.deleteTeamUsers,
  addTeamUsers: ACTIONS.addTeamUsers,
  fetchTeamUsers: ACTIONS.fetchTeamUsers,
};

type MemberManagementType = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const MemberManagement: React.FC<MemberManagementType> = props => {
  const {
    users,
    managementTeam,
    userManagementDrawerOpen,
    pageInfo,
    managementTeamLoading,
    updateUserManagementDrawerOpenStatus,
    fetchOrganizationUsers,
    fetchTeamList,
    deleteTeamUsers,
    addTeamUsers,
    fetchTeamUsers,
  } = props;
  const { organizationId } = useParams<OrganizationUrlParams>();
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);
  const { locale } = useContext(GlobalContext);
  const { global, team } = locale.business;

  useEffect(() => {
    if (managementTeam?.id) {
      fetchTeamUsers({ teamId: managementTeam?.id, page: 1, size: PAGE_SIZE });
    }
  }, [managementTeam?.id]);

  useEffect(() => {
    fetchOrganizationUsers({ organizationId, page: 1, size: PAGE_SIZE });
  }, []);

  const handleSelectUserChange = (value: string[]) => {
    setSelectedUserIds(value);
  };

  const handleClose = () => {
    updateUserManagementDrawerOpenStatus(false);
    fetchTeamList({ organizationId, page: pageInfo.page, size: pageInfo.size });
  };

  const handleAdd = () => {
    if (selectedUserIds.length === 0) {
      message.warning(team.selectUserPlaceHolder);
      return;
    }

    addTeamUsers({
      teamId: managementTeam?.id,
      users: users?.filter(user => selectedUserIds.includes(user.userId)),
      onSuccess: () => {
        setSelectedUserIds([]);
      },
    });
  };

  return (
    <Modal
      title={team.userManagement}
      centered
      visible={userManagementDrawerOpen}
      onCancel={handleClose}
      width="60%"
      style={{ height: '60%' }}
      footer={null}
      destroyOnClose
      maskClosable={false}
    >
      <Spin spinning={managementTeamLoading}>
        <div style={{ display: 'flex', marginBottom: 12 }}>
          <Select
            mode="multiple"
            placeholder={team.selectUserPlaceHolder}
            value={selectedUserIds}
            onChange={handleSelectUserChange}
            style={{ width: '100%' }}
          >
            {users?.map(user => (
              <Option
                key={user.userId}
                value={user.userId}
                disabled={!!managementTeam?.members?.find(item => item.userId === user.userId)}
              >
                {user.account}
              </Option>
            ))}
          </Select>
          <Button
            type="primary"
            onClick={() => {
              handleAdd();
            }}
          >
            <PlusOutlined /> {team.addUser}
          </Button>
        </div>

        <Table
          size="small"
          columns={[
            {
              title: team.account,
              dataIndex: 'account',
            },
            {
              title: team.userId,
              dataIndex: 'userId',
            },
            {
              title: team.joinTime,
              key: 'joinTime',
              width: 200,
              render: (text: string) => periodFormat(text, 'unknown'),
            },
            {
              title: global.actions,
              key: 'status',
              width: 80,
              render: (_text: string, user) => {
                return (
                  <Popconfirm
                    title={`${global.deleteMsg} ${user.account}?`}
                    onConfirm={() => {
                      deleteTeamUsers({ teamId: managementTeam.id, users: [user] });
                    }}
                    okText={global.yes}
                    cancelText={global.no}
                  >
                    <Button size="small" shape="circle" icon={<DeleteOutlined />} />
                  </Popconfirm>
                );
              },
            },
          ]}
          dataSource={managementTeam?.members || []}
          pagination={false}
        />
      </Spin>
    </Modal>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(MemberManagement);
