import styled from "styled-components";
import { AlertCircle, Info } from "lucide-react";

const Card = styled.div`
  background-color: 282f45;
  border-radius: 8px;
`

const CardHeader = styled.div`
  padding: 0.5rem 0.5rem  0.25rem;
  white-space:nowrap;
`

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const TitleContainer = styled.div``

const CardTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: #bac4e2;
  margin: 0;
  display: flex;
  align-items: center;
`

const CardDescription = styled.p`
  margin-top: 0.25rem;
  font-size: 0.875rem;
  color: #bac4e2;
`

const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  background-color: #ef4444;
  color: white;
  font-size: 0.75rem;
  font-weight: 500;
  padding: 0.125rem 0.5rem;
  border-radius: 9999px;
  margin-left: 0.75rem;
  margin-right: 0.75rem;
`

const CardContent = styled.div`
  padding: 0 1.25rem 1.25rem;
`

const Alert = styled.div`
  display: flex;
  flex-direction: column;
  background-color: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.2);
  border-radius: 6px;
  padding: 0.75rem;
  margin-bottom: 1rem;
`

const AlertTitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.25rem;
`

const AlertTitle = styled.h3`
  font-size: 0.875rem;
  font-weight: 500;
  margin: 0;
  color: #bac4e2;
`

const AlertDescription = styled.p`
  font-size: 0.75rem;
  margin: 0;
  padding-left: 1.25rem;
  
`

const Highlight = styled.span`
  font-weight: 600;
`

const TooltipContainer = styled.div`
  position: relative;
  display: inline-block;
`

const TooltipIcon = styled(Info)`
  width: 1.25rem;
  height: 1.25rem;
  color: #64748b;
  cursor: help;
`

const TooltipContent = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  width: 200px;
  padding: 0.5rem;
  background-color: #1e293b;
  color: white;
  border-radius: 4px;
  font-size: 0.75rem;
  z-index: 10;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.2s, visibility 0.2s;
  
  ${TooltipContainer}:hover & {
    opacity: 1;
    visibility: visible;
  }
  
  &::before {
    content: '';
    position: absolute;
    top: -6px;
    right: 10px;
    border-width: 0 6px 6px 6px;
    border-style: solid;
    border-color: transparent transparent #1e293b transparent;
  }
`
export { Card, CardHeader, HeaderContainer, TitleContainer, CardTitle, CardDescription, Badge, CardContent, Alert, AlertTitleRow, AlertTitle, AlertDescription, Highlight, TooltipContainer, TooltipIcon, TooltipContent };