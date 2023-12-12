import usePathname from 'app/hooks/usePathname'
import {
  ComponentType,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { useModal } from 'react-native-modalfy'

interface ModalQueueValues {
  addModalQueue: OpenModal
  addNextModalQueue: OpenModal
  nextModal: () => void
}

const ModalQueueContext = createContext<ModalQueueValues>({
  addModalQueue: () => {},
  addNextModalQueue: () => {},
  nextModal: () => {},
})

type UseModalContext = ReturnType<typeof useModal>
type OpenModal = UseModalContext['openModal']
type CloseModal = UseModalContext['closeModal']

const ModalQueueProvider = ({ children }: { children: ReactNode }) => {
  const [queues, setQueues] = useState<((() => void) | Promise<void>)[]>([])

  const { openModal: openModalModalfy, closeModal: closeModalModalfy } =
    useModal()

  function nextModal() {
    setQueues((prev) =>
      prev.slice(1).map((v, i) => {
        if (i === 0 && typeof v === 'function') {
          // prevent Warning: Cannot update a component (`ModalProvider`) while rendering a different component
          setTimeout(() => {
            v()
          }, 0)
          return Promise.resolve()
        } else return v
      })
    )
  }

  const getModalQueueParams = (...args) => {
    const [modalName, params, callback] = args

    return [
      modalName,
      {
        ...params,
        addNextModalQueue: state.addNextModalQueue,
        nextModal,
      },
      () => {
        callback
      },
    ] as const
  }

  const state = useMemo(() => {
    return {
      addModalQueue: (...args) => {
        const params = getModalQueueParams(...args)
        setQueues((prev) =>
          prev.length > 0
            ? [...prev, () => openModalModalfy(...params)]
            : [Promise.resolve(openModalModalfy(...params))]
        )
      },
      addNextModalQueue: (...args) => {
        const params = getModalQueueParams(...args)
        setQueues((q) => {
          if (q.length > 0) {
            const cloned = [...q]
            cloned.splice(1, 0, () => openModalModalfy(...params))

            return cloned
          } else return [Promise.resolve(openModalModalfy(...params))]
        })
      },
      nextModal,
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queues])

  // useEffect(() => {
  //   console.log('queues', queues)
  //   if (queues.length > 0 && typeof queues[0] === 'function') {
  //     const executedModal = Promise.resolve(queues[0]())
  //     setQueues([executedModal, ...queues.slice(1)])
  //   }
  // }, [queues])

  return (
    <ModalQueueContext.Provider value={state}>
      {children}
    </ModalQueueContext.Provider>
  )
}

export function useModalQueue() {
  return useContext(ModalQueueContext)
}

export const withModalQueue = <P extends object>(
  WrappedComponent: ComponentType<P>
): React.FC<P> => {
  return (props: P) => {
    const { getParam } = props.modal

    const nextModal = getParam('nextModal')

    useEffect(() => {
      return () => {
        nextModal && nextModal()
      }
    }, [])

    return (
      <WrappedComponent
        {...props}
        modal={{
          ...props.modal,
          openModal: getParam('openModalQueue'),
        }}
      />
    )
  }
}

export default ModalQueueProvider
