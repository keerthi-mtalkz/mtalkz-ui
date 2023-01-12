import React, { useState } from "react";
import SectionTitle from "../../components/section-title";
import { useForm } from "react-hook-form";
import Layout from "../../layouts";
import { useRouter } from "next/router";
import { withRedux } from "../../lib/redux";
import {ax} from "../../utils/apiCalls";
import {NotificationManager} from 'react-notifications';
import Select from "react-select";
import Switch from 'react-switch';
import CustomModal from "../../components/custommodal";
import Breadcrumb from '../../components/breadcrumbs';

const Content = () => {
 
  return (
    <Layout>
          <div>content</div>

    </Layout>
  );
};
export default withRedux(Content);

