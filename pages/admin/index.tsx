import { Tabs } from 'antd'
import { unstable_getServerSession } from 'next-auth'
import AdminPageCategories from 'common/components/AdminIU/AdminPageCategorie'
import AdminPageClients from 'common/components/AdminIU/AdminPageClients'
import { authOptions } from '../api/auth/[...nextauth]'
import AdminPageTasks from 'common/components/AdminIU/AdminPageTasks'

const AdminPage: React.FC = () => {
  const { TabPane } = Tabs

  return (
    <>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Categories" key="1">
          <AdminPageCategories />
        </TabPane>
        <TabPane tab="Clients" key="2">
          <AdminPageClients />
        </TabPane>
        <TabPane tab="Tasks" key="3">
          <AdminPageTasks />
        </TabPane>
        <TabPane tab="Domains" key="4">
          Domains
        </TabPane>
      </Tabs>
    </>
  )
}

export default AdminPage

export async function getServerSideProps(context) {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  )

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/${session?.user?.email}`
  )
  const data = await response.json()
  const role = data?.data?.role

  if (role !== 'Worker') {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}
