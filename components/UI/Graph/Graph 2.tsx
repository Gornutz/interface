import { ClassNames } from "@emotion/react";
import Image from "next/image";
import { Fragment, ReactNode } from "react";
import Text from "../Text/Text";
import classes from './Graph.module.scss';

const Graph = (props:any) => {
    return  <Fragment>
            <Text>
                <h6 className="text-muted">{props.label}</h6>
            </Text>

            <div className="py-8 flex items-center">
            <div className="circle-wrap">
              <div className="circle">
                <div className="mask full">
                  <div className="fill"></div>
                </div>
                <div className="mask half">
                  <div className="fill"></div>
                </div>
                <div className="inside-circle">
                  {" "}
                  <Image
                    src="/icons/heart.svg"
                    alt="farming image"
                    width={300}
                    height={100}
                  />
                </div>
              </div>
            </div>
            <Text className="px-8">
                <h2 className="text-muted">{props.value}%</h2>
            </Text>
            </div>
          
    </Fragment>
}

export default Graph